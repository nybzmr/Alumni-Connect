import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white">
            <div className="container flex flex-col items-center justify-between px-6 py-8 mx-auto ">
                <a href="#">
                    <img className="w-auto h-7" src="https://merakiui.com/images/full-logo.svg" alt="Meraki UI logo" />
                </a>

                <div className="flex flex-wrap items-center justify-center gap-4 mt-6 lg:gap-6 ">
                    <a href="#" className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500">
                        Overview
                    </a>

                    <a href="#" className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500">
                        Features
                    </a>

                    <a href="#" className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500">
                        Pricing
                    </a>

                    <a href="#" className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500">
                        Careers
                    </a>

                    <a href="#" className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500">
                        Help
                    </a>

                    <a href="#" className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500">
                        Privacy
                    </a>
                </div>

                <p className="mt-6 text-sm text-gray-500 lg:mt-0">© Copyright 2023 Meraki UI.</p>
            </div>
        </footer>
    );
};

export default Footer;
