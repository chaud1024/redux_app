import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: "I've heard good things.",
    },
    {
        id: '2',
        title: 'Slices...',
        content: "The more I say slice, the more I want pizza.",
    }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // reducers 안에 함수를 만들면, createSlice는 자동적으로 action creator 함수를 같은 이름으로 만들어낸다
        // 그래서 우리가 reducers 안의 action들을 export하면 사실 자동생성된 action creator function이 export되는 것이다.
        postAdded(state, action) {
            // createSlice안에서만 작동하기에 state가 mutate되지 않음
            // 직접 state를 set할 수 있음
            state.push(action.payload)
        }
    }
})

// 모든 포스트들을 select한다.
export const selectAllPosts = (state) => state.posts;


export const { postAdded } = postsSlice.actions

export default postsSlice.reducer