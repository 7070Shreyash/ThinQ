import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode : "light",
    user : null,
    token : null,
    blogs : [],
    ques : [],
};

export const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setMode : (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin : (state , action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout : (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends : (state,action) => {
            if(state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("user friends non-existent :((");
            }
        },
        setBlogs : (state,action) => {
            state.blogs = action.payload.blogs;
        },
        updateBlog : (state,action) => {
            const newBlogs = state.blogs.map((blog) => {
                if(blog._id === action.payload.blog._id) return action.payload.blog;
                return blog;
            });
            state.blogs = newBlogs;
        },
        setQues : (state,action) => {
            state.ques = action.payload.ques;
        },
        updateQues : (state,action) => {
            const newQues = state.ques.map((ques) => {
                if(ques._id === action.payload.ques._id) return action.payload.ques;
                return ques;
            });
            state.ques = newQues;
        },
    },
});
export const { setMode , setLogin , setLogout , setFriends , setBlogs , updateBlog , setQues , updateQues } = authSlice.actions;
export default authSlice.reducer;