Banner Management Application
This project is an Angular application for managing banners. It allows users to create, edit, and upload banners with associated images. The application integrates with a backend API for data storage and retrieval.

Setup
Clone the repository.
Install the necessary dependencies using the command npm install.
Run the development server with ng serve.
Functionality
Banner List
The BannerListComponent displays a list of banners retrieved from the backend API. It supports pagination and sorting of banners based on different parameters.

Banner Editing
The BannerEditComponent enables users to create and edit banners. It allows users to upload images and associate them with the respective banners. The form submission process is synchronized with the image upload process to ensure data consistency.

Key Components
BannerListComponent: Manages the display and interaction with the list of banners.
BannerEditComponent: Handles the creation and editing of individual banners.
ApiService: Interacts with the backend API to perform CRUD operations for banners and image uploads.
How to Use
Access the application at the designated URL.
View the list of existing banners and their details.
Create new banners or edit existing ones using the provided forms.
Upload images for the banners, ensuring that the upload process is completed before submitting the form.
Contributors
lashaloria3@gmail.com
License
This project is licensed under the MIT License - see the LICENSE.md file for details.
