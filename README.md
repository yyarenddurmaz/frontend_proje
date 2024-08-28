Certainly! Here's the updated README.md file that includes details about the dictionary API and the Turkey province-district API:

---

# Angular Website Project

This project is a website built using the Angular framework, designed for developing modern web applications. The project offers a user-friendly interface, combined with a performant and scalable structure.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [APIs Used](#apis-used)
  - [Dictionary API](#dictionary-api)
  - [Turkey Province-District API](#turkey-province-district-api)

## Features

- **Responsive Design:** A responsive design that works seamlessly on both mobile and desktop devices.
- **Theme Support:** Users can toggle between light and dark themes based on their preferences.
- **API Integration:** Fetch dynamic content by integrating with external APIs.
- **Multilingual Support:** Support for multiple languages, such as English and Turkish.
- **Form Handling:** Advanced form validation and reactive forms for user input.
- **User Management:** Features like login, registration, and profile management.
- **Favorites:** Allow users to add their favorite content to a favorites list.
- **Notifications:** Provide users with real-time notifications for actions taken.

## Technologies Used

- **Angular 15+:** The primary framework used.
- **TypeScript:** A superset of JavaScript that provides strong typing.
- **Bootstrap 5:** A styling library for UI components.
- **RxJS:** Library for reactive programming.
- **Angular CLI:** A command-line interface tool to scaffold and manage Angular projects.
- **Angular Router:** A module for managing navigation and routing in the application.
- **i18n:** Angular's integrated module for internationalization.

## Installation

### Prerequisites

- Node.js (v14.x or higher)
- Angular CLI (v15.x or higher)
- NPM (v6.x or higher)

## APIs Used

### Dictionary API

The project integrates with a Dictionary API (`https://dictionaryapi.dev/`) to provide users with features such as word definitions, synonyms, antonyms, and pronunciation. The API allows users to search for words, and the application displays the relevant details dynamically. Additionally, users can save words to their favorites and switch between light and dark themes while viewing the word details.

**Features:**

- Fetch word definitions, synonyms, antonyms, and pronunciations.
- Display word details dynamically based on user search.
- Integration with user preferences for light/dark mode.

### Turkey Province-District API

The application also integrates with the Turkey Province-District API (`https://turkiyeapi.dev/api/v1/`). This API provides detailed data about Turkish provinces and their districts, including population, area, altitude, area codes, coordinates, region, and more. The application uses this data to populate forms, allowing users to select their city and district dynamically.

**Features:**

- Retrieve and display a list of provinces and districts in Turkey.
- Populate form fields with city and district data based on user selection.
- Provide detailed information about selected provinces and districts.
