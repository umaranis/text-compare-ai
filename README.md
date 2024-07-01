# Credit Mapping Tool

## Install the dependecies

- Make sure postgresQL, NodeJS and Python is installed
- Install `pnpm` (Node Package Manager). You can also use `npm`.
- Restore the database dump found in `database` folder
- Change the connection string in `src/lib/db.ts`
- Run the following command to isntall python dependencies

    ```bash
    pip install Flask flask_cors PyPDF2 sentence-transformers nltk
    ```

- Install NodeJS dependencies

    ```bash
    pnpm i
    ```

- Change the API key and Organization ID for OpenAI in `src/lib/openAI.ts`. This is only required for AI Commentary feature.

## Running the application

- Start PostgresQL database
- Launch Python Flask server

    ```bash
    cd backend
    python3 app.py
    ```

- Launch NodeJS Application server

    ```bash
    pnpm dev
    ```
