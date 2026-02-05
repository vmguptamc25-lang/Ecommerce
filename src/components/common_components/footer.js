"use client"
import React from 'react'
import Image from 'next/image'
import apple from '../../assets/images/applestore.png'
import google from '../../assets/images/googlestore.png'

import fb from '../../assets/logo/icons8-facebook-25.png'
import li from '../../assets/logo/icons8-linkedin-25.png'
import tw from '../../assets/logo/icons8-twitter-25.png'
import yo from '../../assets/logo/icons8-youtube-25.png'

import verified from '../../assets/logo/icons8-verified-badge-50.png'
import rtun from '../../assets/logo/icons8-return-50.png'
import { useRouter } from 'next/navigation'

import '../../css/header_footer.css'

export default function Footer() {
  const router = useRouter();

  return (
    <div className='container-fluid light_grey mt-4 py-4'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-3 col-sm-4 col-6 mt-2'>
            <p className='font_mini fw-bold'>Online Shopping</p>
            <ol className='list-unstyled font_grey'>
              <li>Men</li>
              <li>Women</li>
              <li>Kids</li>
              <li>Home & Living</li>
              <li>Beauty</li>
              <li>Gift Cards</li>
              <li>Weaver Insider</li>
            </ol>
          </div>
          <div className='col-lg-3 col-sm-4 col-6 mt-2'>
            <p className='font_mini fw-bold'>Customer Policies</p>
            <ol className='list-unstyled font_grey'>
              <li>Contact Us</li>
              <li className='cpointer' onClick={() => { router.push("/admin") }}>Admin Quatta</li>
              <li>T&Cards</li>
              <li>Terms Of Use</li>
              <li>Track Orders</li>
              <li>Shipping</li>
              <li>Cancellation</li>
              <li>Returns</li>
              <li>Privacy Policy</li>
              <li>Grievance Officer</li>
            </ol>
          </div>
          <div className='col-lg-3 col-sm-4 col-12 mt-2'>
            <p className='font_mini fw-bold'>Experience Weaver App on Mobile</p>
            <div className='d-flex my-4'>
              <Image src={google} alt='Android Store' className='imglogo'></Image>
              <Image src={apple} alt='Apple Store' className='imglogo'></Image>
            </div>
            <div className='row'>
              <p className='font_mini fw-bold m-0'>Keep In Touch</p>
              <div className=''>
                <Image src={fb} alt='facebook' className='m-2 ms-0'></Image>
                <Image src={tw} alt='twitter' className='m-2'></Image>
                <Image src={yo} alt='youtube' className='m-2'></Image>
                <Image src={li} alt='linkedin' className='m-2'></Image>
              </div>
            </div>
          </div>
          <div className='col-lg-3 col-sm-4  col-12 mt-2'>
            <div className='d-flex'>
              <Image src={verified} alt='verified' className='logo m-2'></Image>
              <p className=''><span className='fw-bolder'>100% ORIGINAL</span><span className='font_grey'> guarantee for all products at Weaver.com</span></p>
            </div>
            <div className='d-flex'>
              <Image src={rtun} alt='return policy' className='logo m-2'></Image>
              <p className=''><span className='fw-bolder'>Return within 14days</span><span className='font_grey'>  of receiving your order </span></p>
            </div>
          </div>
          <div className='col-lg-3 col-sm-4 col-6 mt-2'>
            <p className='font_mini fw-bold'>Useful Links</p>
            <ol className='list-unstyled font_grey'>
              <li>Blogs</li>
              <li>Careers</li>
              <li>Site Map</li>
              <li>Corporate Information</li>
              <li>Whitehat</li>
              <li>Cleartrip</li>
            </ol>
          </div>
        </div>
        <div className='row py-4 border border-1 border-end-0 border-start-0 border-solid border_grey'>
          <div className=''>
            <p className='font_mini fw-bold'>Registered Office Address</p>
            <ol className='list-unstyled font_grey'>
              <li>Ghansoli Navi Mumbai,</li>
              <li>Near Dmart,</li>
              <li>Chinchali Road Gunali Talao road,</li>
              <li>Shraddha Saburi Factory</li>
              <li>Plot No 406,407,408</li>
              <li>Pincode - 400701</li>
              <li>Mobile No :- 8451096034</li>
            </ol>
          </div>
        </div>
        <div className='row py-4'>
          <div className=''>
            <p className='font_mini fw-bold m-0'>Online Shopping Made Easy With Weaver</p>
            <p className='font_grey'>If you would like to experience the best of online shopping for men, women and kids in India, you are at the right place. Weaver is the ultimate destination for fashion and lifestyle, being host to a wide array of merchandise including clothing, footwear, accessories, jewellery, personal care products and more. It is time to redefine your style statement with our treasure-trove of trendy items. Our online store brings you the latest in designer products straight out of fashion houses. You can shop online at Weaver from the comfort of your home and get your favourites delivered right to your doorstep.</p>
            <p className='font_mini fw-bold m-0'>Best Shopping Site In India for Fashion</p>
            <p className='font_grey'>
              Be it clothing, footwear or accessories, Weaver offers you the ideal combination of fashion and functionality for men, women and kids. You will realise that the sky is the limit when it comes to the types of outfits that you can purchase for different occasions.
            </p>
            <ol className='font_mini'>
              <li><span className='fw-bold'>Smart men’s clothing -</span><span className='font_grey'>At Weaver, you will find myriad options in smart formal shirts and trousers, cool T-shirts and jeans, or kurta and pyjama combinations for men. Wear your attitude with printed T-shirts. Create the back-to-campus vibe with varsity T-shirts and distressed jeans. Be it gingham, buffalo, or window-pane style, checked shirts are unbeatably smart. Team them up with chinos, cuffed jeans or cropped trousers for a smart casual look. Opt for a stylish layered look with biker jackets. Head out in cloudy weather with courage in water-resistant jackets. Browse through our innerwear section to find supportive garments which would keep you confident in any outfit.
              </span></li>
              <li><span className='fw-bold'>Trendy women’s clothing -</span><span className='font_grey'>At Weaver, you will find myriad options in smart formal shirts and trousers, cool T-shirts and jeans, or kurta and pyjama combinations for men. Wear your attitude with printed T-shirts. Create the back-to-campus vibe with varsity T-shirts and distressed jeans. Be it gingham, buffalo, or window-pane style, checked shirts are unbeatably smart. Team them up with chinos, cuffed jeans or cropped trousers for a smart casual look. Opt for a stylish layered look with biker jackets. Head out in cloudy weather with courage in water-resistant jackets. Browse through our innerwear section to find supportive garments which would keep you confident in any outfit.
              </span></li>
              <li><span className='fw-bold'>Fashionable footwear - </span><span className='font_grey'>At Weaver, you will find myriad options in smart formal shirts and trousers, cool T-shirts and jeans, or kurta and pyjama combinations for men. Wear your attitude with printed T-shirts. Create the back-to-campus vibe with varsity T-shirts and distressed jeans. Be it gingham, buffalo, or window-pane style, checked shirts are unbeatably smart. Team them up with chinos, cuffed jeans or cropped trousers for a smart casual look. Opt for a stylish layered look with biker jackets. Head out in cloudy weather with courage in water-resistant jackets. Browse through our innerwear section to find supportive garments which would keep you confident in any outfit.
              </span></li>
              <li><span className='fw-bold'>Stylish accessories - </span><span className='font_grey'>At Weaver, you will find myriad options in smart formal shirts and trousers, cool T-shirts and jeans, or kurta and pyjama combinations for men. Wear your attitude with printed T-shirts. Create the back-to-campus vibe with varsity T-shirts and distressed jeans. Be it gingham, buffalo, or window-pane style, checked shirts are unbeatably smart. Team them up with chinos, cuffed jeans or cropped trousers for a smart casual look. Opt for a stylish layered look with biker jackets. Head out in cloudy weather with courage in water-resistant jackets. Browse through our innerwear section to find supportive garments which would keep you confident in any outfit.
              </span></li>
              <li><span className='fw-bold'>Fun and frolic -</span><span className='font_grey'>At Weaver, you will find myriad options in smart formal shirts and trousers, cool T-shirts and jeans, or kurta and pyjama combinations for men. Wear your attitude with printed T-shirts. Create the back-to-campus vibe with varsity T-shirts and distressed jeans. Be it gingham, buffalo, or window-pane style, checked shirts are unbeatably smart. Team them up with chinos, cuffed jeans or cropped trousers for a smart casual look. Opt for a stylish layered look with biker jackets. Head out in cloudy weather with courage in water-resistant jackets. Browse through our innerwear section to find supportive garments which would keep you confident in any outfit.
              </span></li>
              <li><span className='fw-bold'>Beauty begins here - </span><span className='font_grey'>At Weaver, you will find myriad options in smart formal shirts and trousers, cool T-shirts and jeans, or kurta and pyjama combinations for men. Wear your attitude with printed T-shirts. Create the back-to-campus vibe with varsity T-shirts and distressed jeans. Be it gingham, buffalo, or window-pane style, checked shirts are unbeatably smart. Team them up with chinos, cuffed jeans or cropped trousers for a smart casual look. Opt for a stylish layered look with biker jackets. Head out in cloudy weather with courage in water-resistant jackets. Browse through our innerwear section to find supportive garments which would keep you confident in any outfit.
              </span></li>
            </ol>
            <p className='font_grey'>
              Weaver is one of the best online shopping sites in India which could help transform your living spaces completely. Add colour and personality to your bedrooms with bed linen and curtains. Use smart tableware to impress your guest. Wall decor, clocks, photo frames and artificial plants are sure to breathe life into any corner of your home.
            </p>

            <p className='font_mini fw-bold m-0'>Affordable Fashion at Your Fingertips</p>
            <p className='font_grey'>Weaver is one of the unique online shopping sites in India where fashion is accessible to all. Check out our new arrivals to view the latest designer clothing, footwear and accessories in the market. You can get your hands on the trendiest style every season in western wear. You can also avail the best of ethnic fashion during all Indian festive occasions. You are sure to be impressed with our seasonal discounts on footwear, trousers, shirts, backpacks and more. The end-of-season sale is the ultimate experience when fashion gets unbelievably affordable.</p>

            <p className='font_mini fw-bold m-0'>Weaver App</p>
            <p className='font_grey'>Weaver, India’s no. 1 online fashion destination justifies its fashion relevance by bringing something new and chic to the table on the daily. Fashion trends seem to change at lightning speed, yet the Weaver shopping app has managed to keep up without any hiccups. In addition, Weaver has vowed to serve customers to the best of its ability by introducing its first-ever loyalty program, The Weaver Insider. Gain access to priority delivery, early sales, lucrative deals and other special perks on all your shopping with the Weaver app. Download the Weaver app on your Android or IOS device today and experience shopping like never before!</p>


            <p className='font_mini fw-bold m-0'>History Of Weaver</p>
            <p className='font_grey'>Becoming India’s no. 1 fashion destination is not an easy feat. Sincere efforts, digital enhancements and a team of dedicated personnel with an equally loyal customer base have made Weaver the online platform that it is today. The original B2B venture for personalized gifts was conceived in 2007 but transitioned into a full-fledged ecommerce giant within a span of just a few years. By 2012, Weaver had introduced 350 Indian and international brands to its platform, and this has only grown in number each passing year. Today Weaver sits on top of the online fashion game with an astounding social media following, a loyalty program dedicated to its customers, and tempting, hard-to-say-no-to deals. <br /><br />The Weaver shopping app came into existence in the year 2015 to further encourage customers’ shopping sprees. Download the app on your Android or IOS device this very minute to experience fashion like never before</p>


            <p className='font_mini fw-bold m-0'>Shop Online at Weaver With Complete Convenience</p>
            <p className='font_grey'>Another reason why Weaver is the best of all online stores is the complete convenience that it offers. You can view your favourite brands with price options for different products in one place. A user-friendly interface will guide you through your selection process. Comprehensive size charts, product information and high-resolution images help you make the best buying decisions. You also have the freedom to choose your payment options, be it card or cash-on-delivery. The 14-day returns policy gives you more power as a buyer. Additionally, the try-and-buy option for select products takes customer-friendliness to the next level.<br /><br />Enjoy the hassle-free experience as you shop comfortably from your home or your workplace. You can also shop for your friends, family and loved-ones and avail our gift services for special occasions.</p>

          </div>
        </div>
      </div>
    </div>
  )
}
