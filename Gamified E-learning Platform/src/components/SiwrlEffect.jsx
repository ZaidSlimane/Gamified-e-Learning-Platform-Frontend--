import { useState, useEffect } from 'react';

function SwirlEffect() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const loadScripts = async () => {
            try {
                await loadScript('/noise.min.js');
                await loadScript('/util.js');
                await loadScript('/swirl.js');
            } catch (error) {
                console.error('Error loading scripts:', error);
            }
        };

        loadScripts();
    }, []);

    return (
        <>
            <div className="frame">
                <div className="frame__title-wrap">
                </div>
            </div>
            <div className="content content--canvas">
            </div>
        </>
    );
}

export default SwirlEffect;

const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        document.body.appendChild(script);
    });
};
