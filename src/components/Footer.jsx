import React from 'react';

const Footer = () => {
    return (
        <div className="footer-container w-full bg-slate-950 text-white flex flex-col items-center fixed bottom-0">
            <div className="logo font-bold text-2xl h-10 flex justify-center items-center w-full">
                <h1 className="name text-2xl">
                    <span className='font-extrabold'>&lt;</span>
                    <span className='font-bold text-3xl text-green-400'> P</span>
                    <span className='font-bold'>ass<span className='text-yellow-400 font-bold'>CB</span></span>
                    <span className='font-extrabold'>/ &gt;</span>
                </h1>
            </div>
            <div className="attributions text-xs text-gray-500 p-2 w-full flex flex-col items-center space-y-1">
                <div>
                    <a href="https://lordicon.com/" className="hover:text-white">Icons by Lordicon.com</a>
                </div>
                <div>
                    <p>
                        Eyecross icon by Hasyim Ari, licensed under CC BY 3.0. Available on 
                        <a href="https://www.iconfinder.com" className="hover:text-white"> Iconfinder</a>.
                    </p>
                </div>
                <div>
                    <p>
                        Github icon by Picons.me, licensed under CC BY 3.0. Available on 
                        <a href="https://www.iconfinder.com" className="hover:text-white"> Iconfinder</a>.
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Footer;
