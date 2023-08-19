import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import './Header.scss';
import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.userData);

  const handleLogout = async () => {
    try {
      const res = await dispatch(logout()).unwrap();
      console.log(res.message);
      toast.success;
      navigate('/auth/login');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="container-main header">
      <div className="user">
        <div className="user-info">
          <FaUserAlt className="user-info__icon" />
          <div className="user-info__details">
            <h3 className="user-info__name">{user?.name}</h3>
            <h4 className="user-info__email">{user?.email}</h4>
          </div>
        </div>
        <div className="user-action">
          <button className="btn btn--danger" onClick={handleLogout}>
            logout
          </button>
        </div>
      </div>
    </div>
  );
};
