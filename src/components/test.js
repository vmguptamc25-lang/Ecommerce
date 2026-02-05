import React from 'react'

// function convertDriveUrl(url) {
//     // Extract the file ID using regular expression
//     const fileId = url.match(/\/file\/d\/([^\/]*)\/?/)[1];
    
//     // Construct the converted URL
//     const convertedUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
    
//     return convertedUrl;
// }

// // Example usage:
// const originalUrl = "https://drive.google.com/file/d/14XnT0Hi92zXAXSsc8kjpXyKTod_Xuyh7/view";
// const convertedUrl = convertDriveUrl(originalUrl);
// console.log(convertedUrl);


export default function Test() {
    return (
        // <div className='container-fluid w-75 '>
        //     <div className='container row row-cols-5 flex-nowrap'>
        //         <div className='col-3 m-2 p-2  border border-1 border-end-0 border-start-0 border-top-0 border-solid border_grey'>
        //             <ol className='list-unstyled font_mini '>
        //                 <li className='fw-bold mb-2 text-warning'>Topwear</li>
        //                 <li>T-Shirt</li>
        //                 <li>Casual Shirts</li>
        //                 <li>Formal Shirts</li>
        //                 <li>Sweatshirts</li>
        //                 <li>Sweaters</li>
        //                 <li>Jackets</li>
        //                 <li>Blazer&Coats</li>
        //                 <li>Suits</li>
        //                 <li>Rain jackets</li>
        //             </ol>
        //         </div>

        //         <div className='col-3 m-2 p-2  border border-1 border-end-0 border-start-0 border-top-0 border-solid border_grey'>
        //             <ol className='list-unstyled font_mini '>
        //                 <li className='fw-bold mb-2 text-warning'>Bottomwear</li>
        //                 <li>jeans</li>
        //                 <li>Casual Trousers</li>
        //                 <li>Formal Trousers</li>
        //                 <li>Shorts</li>
        //                 <li>Track Pants & Joggers</li>
        //             </ol>
        //         </div>

        //         <div className='col-3 m-2 p-2  border border-1 border-end-0 border-start-0 border-top-0 border-solid border_grey'>
        //             <ol className='list-unstyled font_mini '>
        //                 <li className='fw-bold mb-2 text-warning'>Footwear</li>
        //                 <li>Casual Shoes</li>
        //                 <li>Sports Shoes</li>
        //                 <li>Formal Shoes</li>
        //                 <li>Sneakers</li>
        //                 <li>Sandals and Floaters</li>
        //                 <li>Flip and Flops</li>
        //                 <li>Socks</li>
        //             </ol>
        //         </div>

        //         <div className='col-3 m-2 p-2  border border-1 border-end-0 border-start-0 border-top-0 border-solid border_grey'>
        //             <ol className='list-unstyled font_mini '>
        //                 <li className='fw-bold mb-2 text-warning'>InnerWear and SleepWear</li>
        //                 <li>Briefs and Trunks</li>
        //                 <li>Boxers</li>
        //                 <li>Vests</li>
        //                 <li>Sleepwear & Loungewear</li>
        //                 <li>Thermals</li>
        //             </ol>
        //         </div>
                
        //     </div>
        // </div>
        <div className='container-fluid w-75'>
            <div className='container row row-cols-5 flex-nowrap'>
                <div className='col-3 m-2 p-2  border border-1 border-end-0 border-start-0 border-top-0 border-solid border_grey'>
                    <ol className='list-unstyled font_mini '>
                        <li className='fw-bold mb-2 text-info'>Bed Linen & Furnishing</li>
                        <li>Bed Runners</li>
                        <li>Matress Protectors</li>
                        <li>BedSheets</li>
                        <li>Bedding Sets</li>
                        <li>Blankets,Quits and Dohar</li>
                        <li>Bed Covers</li>
                        <li>Diwan Cover</li>
                        <li>Sofa Cover</li>
                        <li>Chari paids & Covers</li>
                    </ol>
                </div>

                <div className='col-3 m-2 p-2  border border-1 border-end-0 border-start-0 border-top-0 border-solid border_grey'>
                    <ol className='list-unstyled font_mini '>
                        <li className='fw-bold mb-2 text-info'>Bath</li>
                        <li>Bath Towels</li>
                        <li>Hands and Face Towels</li>
                        <li>Beach Towels</li>
                        <li>Towels Sets</li>
                        <li>Baths Rugs</li>
                    </ol>
                </div>
                
            </div>
        </div>
    )
}
