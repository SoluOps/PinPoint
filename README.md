# PinPoint

PinPoints is an interactive web application that allows users to add and visualise points of interest on a dynamic map. Users can register or log in to securely add points with a title and description "Point", enhancing their mapping experience.

## Features

- **User Authentication**: Secure registration and login to manage your points.
- **Interactive Map**: Add, view, and interact with points on a customisable map.
- **Point Details**: Each point includes a title and description, "Point" for better context.
- **Real-time Updates**: Instantly see new points added by you and others.

## Technologies Used

- **Frontend**: 
  - **React**: Builds a dynamic and responsive user interface.
  - **MapTiler SDK**: Provides robust and free mapping functionalities. Unlike Llama Dev, which uses Mapbox in the frontend, PinPoints utilises MapTiler as Mapbox doesn't offer a free alternative.
  
- **Backend**:
  - **Node.js & Express**: Powers a scalable and efficient server.
  - **MongoDB**: Stores user data and map points with flexible data modeling.

## Credits

- **MapTiler**: For their open-source map module powering PinPoint.
- **Llama Dev**: Inspiration for design and backend assistance.


## Issues

- **Popup Form Not Closing**: Currently, the popup form for adding a "Point" does not close automatically after submission.

## License

This project is licensed under the [MIT License](LICENSE).
