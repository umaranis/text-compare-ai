from flask_cors import CORS
from flask import Flask, jsonify, request
import PyPDF2
from sentence_transformers import SentenceTransformer, util
model = SentenceTransformer('all-mpnet-base-v2')

app = Flask(__name__)
#CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}})
CORS(app)

@app.route("/api/text-similarity", methods=["GET", "POST"])
def handle_text_similarity():
    text1 = request.json.get('text1')
    text2 = request.json.get('text2')

    text1_lines, text2_lines, similarity_score = compute_text_similarity(text1, text2)
    return jsonify({"similarity_score": similarity_score, "text1_lines": text1_lines, "text2_lines": text2_lines})


def getSentencesFromText_NLTK(text):
    from nltk.tokenize import sent_tokenize
    return sent_tokenize(text)

def getSentencesFromText_Simple(text):
    lines =  text.split('\n')
    return [x for x in lines if len(x.strip()) > 0]

def compute_text_similarity(text1, text2):
    text1_lines = getSentencesFromText_Simple(text1)
    text2_lines = getSentencesFromText_Simple(text2)

    cosine_scores = None

    # calculate embeddings for each sentence in text1_lines
    embeddings1 = [0] * len(text1_lines)
    for i in range(len(text1_lines)):
        embeddings1[i] = model.encode(text1_lines[i], convert_to_tensor=True)

    # calculate embeddings for each sentence in text2_lines
    embeddings2 = [0] * len(text2_lines)
    for i in range(len(text2_lines)):
        embeddings2[i] = model.encode(text2_lines[i], convert_to_tensor=True)
        
    # create multiple dimensional array in python
    r = len(text1_lines)
    c = len(text2_lines)
    arr = [[0] * c for i in range(r)]

    # compare each sentence in text1 with each sentence in text2
    for i in range(len(text1_lines)):
        for j in range(len(text2_lines)):        
            arr[i][j] = (util.cos_sim(embeddings1[i], embeddings2[j]).item() * 100)
            if arr[i][j] + 10 < 100:
                arr[i][j] += 10
            else:
                arr[i][j] = 100

    return text1_lines, text2_lines, arr;

# API endpoint for sentence similarity
@app.route("/api/sentence-similarity", methods=["GET", "POST"])
def handle_sentence_similarity():

    #print(request.json)
    sentence1 = request.json.get('sentence1')
    sentence2 = request.json.get('sentence2')
    #print(sentence1, sentence2)

    similarity_score = compute_sentence_similarity(sentence1, sentence2)
    return jsonify({"similarity_score": similarity_score})

def compute_sentence_similarity(sentence1, sentence2):
    cosine_scores = None
    cosine_score_strings = []
    
    embeddings1 = model.encode(sentence1, convert_to_tensor=True)
    embeddings2 = model.encode(sentence2, convert_to_tensor=True)

    cosine_scores = util.cos_sim(embeddings1, embeddings2)

    cosine_score_strings.append(cosine_scores)
    
    return float(cosine_scores)

@app.route("/api/upload-pdf", methods=["POST"])
def upload_pdf():
    pdf_text1 = ""

    uploaded_file1 = request.files["file1"]

    if uploaded_file1.filename != "":
            if uploaded_file1.filename.endswith(".pdf"):
                pdf_text1 = extract_text_from_pdf(uploaded_file1)

                #return jsonify({"pdf_text": pdf_text1})
                return pdf_text1

    return jsonify({"error": "No PDF file uploaded"})
    
def extract_text_from_pdf(uploaded_file):
    pdf_text = ""
    try:
        pdf_reader = PyPDF2.PdfReader(uploaded_file)
        num_pages = len(pdf_reader.pages)
        for page_num in range(num_pages):
            page = pdf_reader.pages[page_num]
            pdf_text += page.extract_text()
    except Exception as e:
        return f"Error extracting text: {str(e)}"
    return pdf_text

if __name__ == "__main__":
    app.run(debug=True)