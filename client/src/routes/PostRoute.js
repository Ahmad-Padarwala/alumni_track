import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Post from '../pages/post';

const PostRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/post" element={<Post />} />
            </Routes>
        </>
    )
}

export default PostRoute
