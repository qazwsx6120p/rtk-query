import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../public/store/user/userSlice";

/** 用戶資料展示組件 */
const UserProfile = ({ user }) => {
  return (
    <>
      <p>姓名: {user.name.first} {user.name.last}</p>
      <p>性別: {user.gender}</p>
      <p>電話: {user.phone}</p>
    </>
  );
};

const User = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <div>
      <h1>User Profile</h1>
      {status === 'loading' && <p>載入中...</p>}
      {status === 'failed' && <p>獲取用戶資料失敗: {error}</p>}
      {user && <UserProfile user={user} />}
    </div>
  );
};

export default User;
