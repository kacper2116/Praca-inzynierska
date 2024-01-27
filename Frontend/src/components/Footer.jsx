import React from 'react'
import styles from '../styles/footer.module.css'
import { GrFacebook } from 'react-icons/gr'
import { BsTwitter } from 'react-icons/bs'
import { BsInstagram } from 'react-icons/bs'
import { SiTiktok } from 'react-icons/si'


const FooterSection = ({ data }) => {

  return (

    <div className={styles.FooterSection}>
      <h3>{data.header}</h3>
      <div>
        {data.content.map((item, index) => {
          return (
            <span key={index}><a href={data.links[index]}>{item}</a></span>
          )
        })}
      </div>
    </div>
  )
}


const FooterSection1 = {
  header: "Kipme",
  content: ["O nas", "Aktualności", "Kontakt"],
  links: ["#", "#", "#"]
}
const FooterSection2 = {
  header: "Konto",
  content: ["Logowanie", "Rejestracja", "Problem z kontem"],
  links: ["#", "#", "#"]
}
const FooterSection3 = {
  header: "Gry",
  content: ["Odkrywaj", "Wszystkie gry", "Najlepsze gry"],
  links: ["#", "#", "#"]
}
const FooterSection4 = {
  header: "Kipme",
  content: ["O nas", "Aktualności", "Kontakt"],
  links: ["#", "#", "#"]
}



const SocialMediaIcons = [<GrFacebook />, <BsTwitter />, <BsInstagram />, <SiTiktok />]

const FooterSection5 = {
  header: "Social media",
  content: SocialMediaIcons,
  links: ["https://www.facebook.com/", "https://twitter.com/", "https://www.instagram.com/", "https://www.tiktok.com/"]
}




const Footer = () => {
  return (

    <div className={styles.Container}>
      <div className={styles.Wrapper}>
        <FooterSection data={FooterSection1} />
        <FooterSection data={FooterSection2} />
        <FooterSection data={FooterSection3} />
        <FooterSection data={FooterSection4} />
        <FooterSection data={FooterSection5} />

      </div>
    </div>

  )
}

export default Footer