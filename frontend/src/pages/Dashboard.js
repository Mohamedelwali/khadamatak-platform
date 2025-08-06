import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  return (
    <div dir="rtl">
      <h1>لوحة التحكم</h1>
      <button onClick={handleLogout}>تسجيل الخروج</button>
    </div>
  );
}
