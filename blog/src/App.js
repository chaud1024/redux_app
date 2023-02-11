import AddPostForm from "./features/posts/AddPostForm";
import PostsList from "./features/posts/PostsList";
import SinglePostPage from "./features/posts/SinglePostPage";
import Layout from "./components/Layout";
import {Routes, Route, Navigate} from 'react-router-dom'
import EditPostForm from "./features/posts/EditPostForm";
import UsersList from "./features/users/UsersList";
import UserPage from "./features/users/UserPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* root route "/" pass in layout: parent to everything */}
      
        <Route index element={<PostsList />} />
        {/* postList: we want to come up as the home page */}

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>

        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>

        {/* Catch all - replace with 404 component if you want */}
        <Route path="*" element={<Navigate to="/" replace />} />
        {/* *: going to select any route that makes it past these other routes */}
        {/* if it doesn't match any of these, it will go to home */}
        {/* replace: will replace the bad request */}

      </Route>
    </Routes>
  );
}

export default App;
