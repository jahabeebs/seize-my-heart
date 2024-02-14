"use client";

import { useState, useRef, FunctionComponent } from 'react';
import html2canvas from "html2canvas";

const Home: FunctionComponent = () => {
    const [message, setMessage] = useState<string>('');
    const [downloadUrl, setDownloadUrl] = useState<string>('');
    const imageRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const textInputRef = useRef<HTMLInputElement>(null);

    const handleDownload = () => {
        const element = document.getElementById('captureArea');
        if (element) {
            html2canvas(element, {
                scale: 2,
            }).then(canvas => {
                const image = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.download = 'seize-my-heart.png';
                link.href = image;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }).catch(err => {
                console.error('Error capturing image:', err);
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div id="captureArea" className="relative capture-area">
                <img src="/seize-my-heart.png" alt="Background" ref={imageRef} className="max-w-xs md:max-w-lg"/>
                <canvas ref={canvasRef} className="hidden"></canvas>
                <p
                    className="absolute bottom-10 left-24 w-full text-center text-white font-light text-xl break-words tracking-tight"
                    style={{fontFamily: 'Times New Roman', fontWeight: "lighter", maxWidth: 300}}
                >
                    {message}
                </p>
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message here"
                className="mt-4 p-2 w-64 text-center text-black"
                ref={textInputRef}
            />
            <button onClick={handleDownload} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                Download Image
            </button>
            <p className="mt-4 text-gray-600 text-xs">
                Built by{' '}
                <a
                    href="https://twitter.com/jahabeebs"
                    className="text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {' '}
                    @jahabeebs
                </a>
            </p>
            <p className="mt-4 text-gray-600 text-xs">
                Filter hate using
                <a
                    href="https://openmoderator.com"
                    className="text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {' '}
                    OpenModerator
                </a>
            </p>
        </div>
    );
};

export default Home;
