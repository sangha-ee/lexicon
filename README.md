## Getting Started

This project has been tested with Node.js versions 18 and 20.
You can see this project live at https://simple-press.vercel.app/.

1. **Setup Environment Variables**
   - Create an `.env` file in the root directory of the project.
   - Add the following values from the provided gist link:
     ```bash
     POSTGRES_URL=""
     POSTGRES_PRISMA_URL=""
     POSTGRES_URL_NO_SSL=""
     POSTGRES_URL_NON_POOLING=""
     POSTGRES_USER=""
     POSTGRES_HOST=""
     POSTGRES_PASSWORD=""
     POSTGRES_DATABASE=""
     ```

execute `npm run seed-db` to populate the database. This step is only necessary if you are using your own database.

2. **Install Dependencies**
   - Run the following command to install the necessary dependencies:
     ```bash
     npm install
     ```

3. **Start the Development Server**
   - Launch the development server with the command:
     ```bash
     npm run dev
     ```

4. **Access the Application**
   - Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the result.


## Features

- **Site-wide Features:**
    - Utilizes server-side rendering and react server components(RSC).
    - Offers Dark/Light/System Preference mode switcher.
    - Includes skeleton loading indicators.
    - Implements server actions.
    - Responsive UI, mobile menu etc.
    - Utilizes kysely query builder for database implementation.
    - CI/CD deployments.
    - Server side validations as well as client side input validations.

- **Home Page ("/"):**
    - Implements infinite loading
    - Displays summaries of blog posts without the full description.
    - Users can click to view the full blog post.

- **Individual Blog Post ("/<blog-post-id>"):**
    - Allows users to view the full blog post.

- **Admin Panel ("/admin"):**
    - Enables adding new posts.
    - Supports editing existing posts.
    - Allows deletion of posts.

## Screenshots
NB: In these clips, I have intentionally added delays so loading screens are visible.

![Home page](https://github.com/pahans/simple-press/assets/1552869/7ad7bc7d-de9c-4309-abb0-831334292fdc)


![Admin page](https://github.com/pahans/simple-press/assets/1552869/08117dac-d8dc-443e-ad40-67c8b539be15)


![Mobile menu](https://github.com/pahans/simple-press/assets/1552869/437916f3-c91e-43e2-b556-cb8704a0dd8b)



## Tech Stack

- React, Typescript
- Tailwind CSS (https://tailwindcss.com/)
- Shadcn components (https://ui.shadcn.com/)
- Storybook (https://storybook.js.org/)
- ESLint, Prettier

## Future Improvements

- Enhance test coverage.
- Introduce a test/staging environments.
- Implement user authentication.
- Introduce end-to-end tests.
- More granular error handling.
- Add search feature.
- Show notifications on success or failure.
- Please feel free to create GitHub issues for any feature requests.


**Important:** Components located in the `src/components/ui` directory are sourced from [Shadcn components](https://ui.shadcn.com/).
