<strong>Project Title:</strong> Full-Stack Blog Platform with Separate API and Frontend

<strong>Project Overview:</strong>
This project involves building a complete blog platform with a RESTful API backend and two frontend applications: one for public readers and another for blog authors. The backend handles all CRUD operations for blog posts, comments, and user accounts, while also managing authentication and authorization using JWTs. The reader-facing frontend allows users to view and comment on blog posts, while the author-facing frontend provides tools for managing posts, editing content, and publishing/unpublishing articles.

<strong>Technologies and Skills Used:</strong>

<ul>
  <li><strong>Node.js & Express:</strong> Used for building the backend RESTful API, handling routing, and managing HTTP requests.</li>
  <li><strong>Prisma ORM:</strong> For defining database models and managing interactions with the database.</li>
  <li><strong>JWT Authentication (jsonwebtoken):</strong> Implemented secure authentication using JSON Web Tokens for protecting routes.</li>
  <li><strong>Passport.js:</strong> Used Passport’s JWT strategy for verifying tokens and managing user login sessions.</li>
  <li><strong>MongoDB:</strong> Used as the database for storing user, post, and comment data.</li>
  <li><strong>Frontend Frameworks (Vanilla JavaScript):</strong> React was used for building the user interface, handling state, and managing API requests. Alternatively, a simple HTML/CSS frontend could be used.</li>
  <li><strong>Fetch API:</strong> Integrated fetch calls to interact with the backend API from the frontend applications.</li>
  <li><strong>HTML5/CSS3:</strong> For building the frontend UI with responsive design and user-friendly interfaces.</li>
  <li><strong>Rich Text Editor (TinyMCE):</strong> Used in the author-facing frontend to create and edit posts with rich formatting.</li>
  <li><strong>Version Control (GitHub):</strong> Managed the project using Git, with separate repositories for the backend and frontends.</li>
  <li><strong>Deployment:</strong> Deployed the API using Heroku, and the frontends using platforms like Netlify or Vercel.</li>
</ul>

<strong>Features:</strong>

<ul>
  <li><strong>Backend API:</strong>
    <ul>
      <li><strong>Models & Schemas:</strong> Defined models for Posts, Comments, and Users using Prisma ORM. Post and comment models include fields like title, content, timestamp, and status (published/unpublished).</li>
      <li><strong>User Authentication:</strong> Implemented secure login and registration routes with JWT-based authentication. Users receive a JWT upon login, which is stored in localStorage and used for subsequent requests.</li>
      <li><strong>Protected Routes:</strong> Routes for creating, editing, and deleting posts and comments are protected behind authentication, ensuring only authorized users can access them.</li>
      <li><strong>CRUD Operations:</strong> Implemented all standard CRUD operations for posts and comments, following RESTful design principles.</li>
      <li><strong>Commenting System:</strong> Users can leave comments on blog posts. Comments include username, content, and timestamp, with options to require usernames or emails.</li>
      <li><strong>Post Management:</strong> Added features to manage published and unpublished posts, allowing the author to toggle post visibility.</li>
    </ul>
  </li>
  <li><strong>Reader-Facing Frontend:</strong>
    <ul>
      <li><strong>Post Display:</strong> Fetches posts from the API and displays them with title, content, and publish date. Pagination or infinite scrolling is used for better user experience.</li>
      <li><strong>Commenting:</strong> Readers can view and add comments to posts, with the option to require username/email.</li>
      <li><strong>Responsive Design:</strong> The layout is optimized for both desktop and mobile devices.</li>
    </ul>
  </li>
  <li><strong>Author-Facing Frontend:</strong>
    <ul>
      <li><strong>Post Management Dashboard:</strong> Displays all posts with indicators showing whether they are published or unpublished. Allows the author to publish/unpublish posts with a click.</li>
      <li><strong>Post Editor:</strong> Includes a rich text editor for creating and formatting blog posts. The editor provides options for saving drafts, publishing posts, and editing existing posts.</li>
      <li><strong>Comment Management:</strong> Provides tools for reviewing, editing, or deleting user comments.</li>
      <li><strong>Authentication & Authorization:</strong> The frontend allows the author to log in and receive a JWT, which is used to access protected routes and manage posts securely.</li>
    </ul>
  </li>
  <li><strong>Authentication Workflow:</strong>
    <ul>
      <li><strong>JWT-Based Security:</strong> On successful login, a JWT is generated and stored in localStorage. Subsequent requests to protected routes include the JWT in the Authorization header.</li>
      <li><strong>Session Management:</strong> The author’s session is maintained through the JWT, allowing secure access until the token expires or the user logs out.</li>
    </ul>
  </li>
  <li><strong>API Documentation & Testing:</strong>
    <ul>
      <li><strong>API Documentation:</strong> Detailed documentation for each endpoint was created to specify route paths, methods, required fields, and expected responses.</li>
      <li><strong>Postman/Curl Testing:</strong> Routes were tested using Postman and curl to verify that all operations work as intended.</li>
    </ul>
  </li>
  <li><strong>Deployment & CI/CD:</strong>
    <ul>
      <li>The backend API was deployed to Heroku with environment variables securely managed for database connections and JWT secrets.</li>
      <li>The frontend applications were deployed separately using platforms like Netlify, with environment variables configured for API endpoint URLs.</li>
    </ul>
  </li>
</ul>
