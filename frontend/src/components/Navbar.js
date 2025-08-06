import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('access');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" dir="rtl">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">خدماتك</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">الرئيسية</Link>
            </li>

            {!token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">تسجيل الدخول</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">تسجيل حساب جديد</Link>
                </li>
              </>
            )}

            {token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">لوحة التحكم</Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-sm btn-danger ms-2">
                    تسجيل الخروج
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
