import './Header.scss';
import { FaUserAlt } from 'react-icons/fa';

export const Header = () => {
  return (
    <div className="container-main header">
      <div className="user">
        <div className="user-info">
          <FaUserAlt className="user-info__icon" />
          <div className="user-info__details">
            <h3 className="user-info__name">User name</h3>
            <h4 className="user-info__email">email@com</h4>
          </div>
        </div>
        <div className="user-action">
          <button className="btn btn--action">edit</button>
          <button className="btn btn--danger">logout</button>
        </div>
      </div>
    </div>
  );
};
