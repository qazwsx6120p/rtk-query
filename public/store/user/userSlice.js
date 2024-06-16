import { createSlice } from "@reduxjs/toolkit";

/** 初始狀態 */
const initialState = {
  user: null, // 初始用户数据为空
  status: 'idle', // 初始状态为空闲状态
  error: null, // 初始错误状态为空
};

/** 創建了一個名為 userSlice 的切片
 *  @name 切片名稱
 *  @initialState 初始狀態
 *  @reducers 包含 reducer 函式的物件 */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /** 設定使用者資料
     *  @state 狀態
     *  @action 本身不執行任何操作。它只是提供一個信息給 reducer，告訴 reducer 發生了什麼事情 */
    setUserProfile(state, action) {
      state.user = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    setLoading(state) {
      state.status = 'loading';
      state.error = null;
    },
    setError(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    }
  },
});

export const { setUserProfile, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;

/** 創建異步 thunk action 以獲取用戶資料 */
export const fetchUserProfile = () => {
  return async (dispatch) => {
    dispatch(setLoading());
    const fetchData = async () => {
      const response = await fetch('https://randomuser.me/api/');
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.results[0];
    };

    try {
      const userData = await fetchData();
      dispatch(setUserProfile(userData));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};
