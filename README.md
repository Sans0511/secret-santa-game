# Secret Santa Game

This is a Secret Santa game application built with Next.js and deployed on Vercel.

## Features

- **CSV Upload:** Allows users to upload a CSV file containing employee data for the Secret Santa game.
- **Data Validation:** Validates the uploaded CSV data against a Zod schema to ensure data integrity.
- **Secret Santa Generation:** Generates Secret Santa assignments based on the uploaded data.
- **CSV Download:** Allows users to download the Secret Santa assignments as a CSV file.
- **Sample CSV Download:** Provides a sample CSV file for users to understand the required format.
- **Error Handling:** Displays error messages for invalid CSV data or other issues.
- **Responsive Design:** The application is designed to be responsive and work on various screen sizes.
- **Confirmation Modal:** A confirmation modal is used before downloading the generated CSV file.

## Technologies Used

- **Next.js:** React framework for building server-rendered applications.
- **TypeScript:** Static type checker for JavaScript.
- **Tailwind CSS:** Utility-first CSS framework.
- **Zod:** Schema declaration and validation library.
- **CSV Parser (custom):** Custom utility for parsing CSV files in the browser.
- **Vercel:** Platform for deployment and hosting.

## Getting Started

### Prerequisites

- Node.js (version 18 or later recommended)
- npm or yarn

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2.  Navigate to the project directory:

    ```bash
    cd <project_directory>
    ```

3.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

### Development

1.  Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

2.  Open your browser and navigate to `http://localhost:3000`.

### Building and Deployment

1.  Build the application:

    ```bash
    npm run build
    # or
    yarn build
    ```

2.  Export the application (if needed for static hosting):

    ```bash
    npm run export
    # or
    yarn export
    ```

3.  Deploy to Vercel (or your preferred hosting platform). If you are using vercel, simply push the code to a github repo, and connect that repo to vercel.

## Project Structure
