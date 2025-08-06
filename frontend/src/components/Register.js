import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    userType: 'عميل',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const usernameRef = useRef(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (activeTab === 'register' && usernameRef.current) {
      usernameRef.current.focus();
    }
  }, [activeTab]);

  const validateEmail = (email) => {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    // Accepts numbers, optional +, 9-15 digits
    return phone === '' || /^\+?\d{9,15}$/.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const checkPasswordStrength = (password) => {
    if (!password) return '';
    if (password.length < 8) return 'ضعيف';
    if (!/[0-9]/.test(password)) return 'يجب أن تحتوي على رقم';
    if (!/[A-Za-z]/.test(password)) return 'يجب أن تحتوي على حرف';
    return 'قوي';
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (loading) return; // Prevent double submit
    if (activeTab === 'register') {
      if (!validateEmail(formData.email)) {
        setError('يرجى إدخال بريد إلكتروني صحيح');
        return;
      }
      if (!validatePhone(formData.phone)) {
        setError('يرجى إدخال رقم هاتف صحيح');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('كلمتا المرور غير متطابقتين');
        return;
      }
      if (checkPasswordStrength(formData.password) !== 'قوي') {
        setError('كلمة المرور ضعيفة أو غير مطابقة للمعايير');
        return;
      }
      setLoading(true);
      try {
        const res = await fetch('http://127.0.0.1:8000/api/accounts/register/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            is_craftsman: formData.userType === 'حرفي',
          }),
        });
        setLoading(false);
        if (res.ok) {
          setSuccess('تم التسجيل بنجاح. سيتم تحويلك لتسجيل الدخول...');
          setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            userType: 'عميل',
          });
          setTimeout(() => {
            setActiveTab('login');
            setSuccess('');
          }, 1500);
        } else {
          const data = await res.json();
          // Show all error messages if available
          if (data && typeof data === 'object') {
            let messages = [];
            for (const key in data) {
              if (Array.isArray(data[key])) {
                messages.push(...data[key]);
              } else if (typeof data[key] === 'string') {
                messages.push(data[key]);
              }
            }
            setError(messages.length ? messages.join('، ') : 'فشل التسجيل');
          } else {
            setError(data.detail || 'فشل التسجيل');
          }
        }
      } catch (err) {
        setLoading(false);
        setError('حدث خطأ ما. حاول مرة أخرى.');
      }
    } else {
      // Login logic here (for demonstration, just redirect)
      navigate('/dashboard');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100" dir="rtl">
      <div className="p-4 border rounded shadow w-100" style={{ maxWidth: '450px', background: '#fff' }}>
        <div className="text-center mb-3">
          <span style={{ fontSize: '2rem' }}>🔧</span>
          <h2 className="mt-2">خدماتك</h2>
          <p className="mb-2">منصة ربط العملاء بمزودي الخدمات</p>
        </div>
        <div className="d-flex justify-content-center mb-3">
          <button
            type="button"
            className={`btn btn-light flex-fill ${activeTab === 'login' ? 'border-bottom border-dark' : ''}`}
            style={{ borderRadius: '0', fontWeight: activeTab === 'login' ? 'bold' : 'normal' }}
            onClick={() => setActiveTab('login')}
          >
            تسجيل الدخول
          </button>
          <button
            type="button"
            className={`btn btn-light flex-fill ${activeTab === 'register' ? 'border-bottom border-dark' : ''}`}
            style={{ borderRadius: '0', fontWeight: activeTab === 'register' ? 'bold' : 'normal' }}
            onClick={() => setActiveTab('register')}
          >
            تسجيل جديد
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {activeTab === 'login' ? (
            <>
              <div className="mb-3">
                {/* ...existing code... */}
              </div>
              <div className="mb-3">
                <label className="form-label">البريد الإلكتروني</label>
                <div className="input-group">
                  <input name="email" type="email" className="form-control" onChange={handleChange} required />
                  <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">كلمة المرور</label>
                <div className="input-group">
                  <input type={showPassword ? "text" : "password"} name="password" className="form-control" onChange={handleChange} required />
                  <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={() => setShowPassword(s => !s)}>
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </span>
                </div>
              </div>
              <button type="submit" className="btn btn-dark w-100">تسجيل الدخول</button>
              <div className="mt-2 text-center">
                <a href="#" style={{ color: '#333', textDecoration: 'underline' }}>نسيت كلمة المرور؟</a>
              </div>
            </>
          ) : (
            <>
              <div className="mb-3">
                <label className="form-label">اسم المستخدم</label>
                <input ref={usernameRef} name="username" className="form-control" value={formData.username} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">نوع المستخدم</label>
                <select name="userType" className="form-select" value={formData.userType} onChange={handleChange}>
                  <option value="عميل">عميل</option>
                  <option value="حرفي">حرفي</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">البريد الإلكتروني</label>
                <div className="input-group">
                  <input name="email" type="email" className="form-control" value={formData.email} onChange={handleChange} required />
                  <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">رقم الهاتف</label>
                <input name="phone" className="form-control" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">كلمة المرور</label>
                <div className="input-group">
                  <input type={showPassword ? "text" : "password"} name="password" className="form-control" value={formData.password} onChange={handleChange} required />
                  <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={() => setShowPassword(s => !s)}>
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </span>
                </div>
                {formData.password && (
                  <small className={`text-${passwordStrength === 'قوي' ? 'success' : 'danger'}`}>قوة كلمة المرور: {passwordStrength}</small>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">تأكيد كلمة المرور</label>
                <div className="input-group">
                  <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" className="form-control" value={formData.confirmPassword} onChange={handleChange} required />
                  <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={() => setShowConfirmPassword(s => !s)}>
                    <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </span>
                </div>
              </div>
              <button type="submit" className="btn btn-dark w-100" disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'تسجيل جديد'}
              </button>
            </>
          )}
          {error && <div className="alert alert-danger mt-2">{error}</div>}
          {success && <div className="alert alert-success mt-2">{success}</div>}
        </form>
      </div>
    </div>
  );
}
