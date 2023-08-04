
# Code Converter, Debugger, and Code Quality Checker

This project implements a backend API that provides functionality for code conversion, debugging, and code quality checking using the OpenAI API. The API allows users to convert code from one programming language to another, debug code for errors and explanations, and analyze the quality of the provided code.

## Getting Started

To use this API, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Set up your OpenAI API key by replacing `'YOUR_OPENAI_API_KEY'` in the `server.js` file with your actual OpenAI API key.
4. Run the server using `npm start`.

## Endpoints

### Code Conversion

Endpoint: `POST /convert`

Converts code from one programming language to another.

#### Request Body

```json
{
  "code": "function add(a, b) {\n  return a + b;\n}",
  "fromLanguage": "JavaScript",
  "toLanguage": "Python"
}
```
Response

```json
{
  "convertedCode": "def add(a, b):\n    return a + b"
}
```

### Code Debugger

Endpoint: `POST /debug`

Identifies and explains errors in the provided code.

#### Request Body

```json
{
  "code": "function add(a, b) {\n  return a + b;\n}"
}
```
Response

```json
{
  "debugInfo": "SyntaxError: Unexpected token 'return'"
}

```

### Code Quality Checker

Endpoint: `POST /codeQuality`

Analyzes the quality of the provided code.

#### Request Body

```json
{
  "code": "function add(a, b) {\n  return a + b;\n}"
}
```
Response

```json
{
  "qualityReport": "Code Quality Report:
    
    1. Readability: This code is very simple and easy to read. It is written in a clear and concise manner and the purpose of the code is very clearly stated.
    
    2. Naming Conventions: The function name "add" accurately describes its purpose.
    
    3. Optimization: The code is already optimized for maximum speed and efficiency.
    
    4. Consistency: The code is consistent in its formatting and style.
    
    5. Error Handling: There is no error handling code included in this example.
    
    Summary: This code is of high quality and clearly demonstrates its purpose. It is also well formatted, consistent, and optimized for speed and efficiency. However, it is lacking in error handling capabilities."
}
```
> Make sure your Node.js server is running, and you have replaced 'OPENAI_API_KEY' with your actual OpenAI API key.
