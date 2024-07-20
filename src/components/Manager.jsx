import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import animatedeye from './eye.json';
import eyecross from './eyecross.svg';
import copysvg from './copy.svg';
import editicon from './edit.json';
import { v4 as uuidv4 } from 'uuid';
import useWindowSize from '../hooks/useWindowSize';

const Manager = () => {
  const [showEye, setShowEye] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ site: '', username: '', password: '' });
  const [passwordArray, setPasswordArray] = useState([]);

  const size = useWindowSize();
  const getIconSize = () => {
    if (size.width <= 640) {
      return { width: 23, height: 24 };
    } else {
      return { width: 32, height: 32 };
    }
  };

  const getPasswords = async () => {
    try {
      let req = await fetch("http://localhost:3000/");
      let passwords = await req.json();
      console.log('Fetched passwords:', passwords);  // Log the fetched passwords
      setPasswordArray(passwords);
    } catch (error) {
      console.error('Error fetching passwords:', error);
    }
  };

  useEffect(() => {
    getPasswords()
  }, []);

  const toggleIconAndPassword = () => {
    setShowEye(prevState => !prevState);
    setShowPassword(prevState => !prevState);
  };

  const savePassword = async () => {
    if (form.site.length >= 3 && form.username.length > 3 && form.password.length > 3) {
      try {
        // If any such id exists in the db, delete it
        if (form.id) {
          await fetch("http://localhost:3000/", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: form.id }),
          });
        }

        const newPassword = { ...form, id: uuidv4() };
        await fetch("http://localhost:3000/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPassword),
        });

        setPasswordArray(prev => [...prev.filter(p => p.id !== form.id), newPassword]);
        setForm({ site: '', username: '', password: '' });

        toast.success('Password saved', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } catch (error) {
        console.error('Error saving password:', error);
        toast.error('Failed to save password. Please try again.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      toast.error('Password not saved! It must be at least 3 characters long.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };


  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = text => {
    navigator.clipboard.writeText(text);
    toast.success('Text copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const deletePassword = async (id) => {
    let c = window.confirm('Do you want to delete this password?');
    if (c) {
      const updatedPasswords = passwordArray.filter(item => item.id !== id);
      setPasswordArray(updatedPasswords);
      let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
      // localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
      toast.success('Password deleted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
    }
  };

  const editPassword = (id) => {
    setForm({ ...passwordArray.filter(i => i.id === id)[0], id: id })
    setPasswordArray(passwordArray.filter(i => i.id !== id))
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="md:container mx-auto max-w-5xl py-10 md:px-20 px-2 flex justify-center flex-col items-center">
        <h1 className="name text-2xl">
          <span className="font-extrabold">&lt;</span>
          <span className="font-bold text-3xl text-green-400">P</span>
          <span className="font-bold">
            ass<span className="text-yellow-400 font-bold">CB</span>
          </span>
          <span className="font-extrabold">/ &gt;</span>
        </h1>
        <p>Your own Password Manager</p>

        <div className="flex flex-col p-4 w-full gap-5 text-black items-center">
          <input
            name="site"
            onChange={handleChange}
            value={form.site}
            placeholder="Enter Website URL"
            className="rounded-full border border-customGreen py-1 px-3 w-full"
            type="text"
          />

          <div className="flex gap-4 w-full flex-col sm:flex-row">
            <input
              name="username"
              onChange={handleChange}
              value={form.username}
              placeholder="Enter Username"
              type="text"
              className="rounded-full border border-customGreen py-1 px-3 w-full"
            />
            <div className="relative w-full">
              <input
                name="password"
                onChange={handleChange}
                value={form.password}
                placeholder="Enter Password"
                type={showPassword ? 'text' : 'password'}
                className="rounded-full border border-customGreen py-1 px-3 w-full"
              />
              <span className="absolute right-0 top-0 p-1 cursor-pointer" onClick={toggleIconAndPassword}>
                {showEye ? (
                  <Lottie animationData={animatedeye} style={{ width: 28, height: 24 }} />
                ) : (
                  <img src={eyecross} alt="Eye Cross Icon" style={{ width: 28, height: 24 }} />
                )}
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center border border-emerald-300 items-center rounded-full md:py-[6px] 
            py-1 px-2 md:px-3 w-fit bg-customGreen hover:bg-customGreenHover">
            <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
            Add Password
          </button>
        </div>

        <div className="passwords-container flex flex-col items-center justify-center w-full">
          <h2 className="md:text-2xl text-xl">YOUR PASSWORDS</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full bg-green-100 text-black text-center overflow-hidden rounded-lg">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className='md:text-base text-xs'>Site</th>
                  <th className='md:text-base text-xs'>Usernames</th>
                  <th className='md:text-base text-xs'>Passwords</th>
                  <th className='md:text-base text-xs'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map(item => (
                  <tr key={item.id}>
                    <td className="border border-white py-2 break-all whitespace-normal">
                      <div className="flex justify-center items-center gap-2">
                        <a href={item.site} target="_blank">
                          <span className="md:text-base text-xs">{item.site}</span>
                        </a>
                        <img
                          onClick={() => copyText(item.site)}
                          className="cursor-pointer copy-btn responsive-copy-icon"
                          src={copysvg}
                          alt="Copy"
                          style={{ width: 28, height: 24 }}
                        />
                      </div>
                    </td>

                    <td className="border border-white py-2 break-all whitespace-normal">
                      <div className="flex justify-center items-center gap-2">
                        <span className="md:text-base text-xs">{item.username}</span>
                        <img
                          onClick={() => copyText(item.username)}
                          className="cursor-pointer copy-btn responsive-copy-icon"
                          src={copysvg}
                          alt="Copy"
                          style={{ width: 28, height: 24 }}
                        />
                      </div>
                    </td>

                    <td className="border border-white py-2 px-5 break-all whitespace-normal">
                      <div className="flex justify-center items-center gap-4">
                        <span className="md:text-base text-xs font-bold">{"*".repeat(item.password.length)}</span>
                        <img
                          onClick={() => copyText(item.password)}
                          className="cursor-pointer responsive-copy-icon"
                          src={copysvg}
                          alt="Copy"
                          style={{ width: 28, height: 24 }}
                        />
                      </div>
                    </td>


                    <td className="border border-white md:py-2">
                      <div className="flex justify-center items-center gap-1 md:gap-2 flex-col md:flex-row">
                        <span onClick={() => editPassword(item.id)} className="cursor-pointer edit-btn">
                          <Lottie
                            animationData={editicon}
                            style={getIconSize()}
                            className="responsive-edit-icon"
                          />
                        </span>
                        <span onClick={() => deletePassword(item.id)} className="cursor-pointer delete-btn m-0">
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            colors="primary:#109121"
                            style={getIconSize()}
                            className="responsive-delete-icon"
                          ></lord-icon>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
