import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa"
import styles from "./BusinessCard4.module.css"

const BusinessCard4 = (story) => {
  return (
    <div className={styles.card} id={`business-card-${story.story._id}`}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            {/* <div className={styles.cube1}></div>
            <div className={styles.cube2}></div>
            <div className={styles.cube3}></div> */}
            <img src="./logo1.png" alt="logo" className="h-8 w-10 rounded-full" />
          </div>
          <div className={styles.logoText}>
            <span className={styles.brandName}>NAYTA</span>
            <span className={styles.brandType}>PATEL</span>
            <span className={styles.brandType}>NETWORK</span>
            {/* <div className={styles.slogan}>Slogan Goes Here</div> */}
          </div>
        </div>
        <div className={styles.blueAccent}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.leftSection}>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <div  className={styles.iconBox}>
              <FaPhone className={styles.icon} />

              </div>
              <div>
                <div>+91 {story.story.mobile}</div>
                {/* <div>{story.story.mobile}</div> */}
              </div>
            </div>

            <div className={styles.contactItem}>
              <div  className={styles.iconBox}>
              <FaWhatsapp className={styles.icon}/>

              </div>
              <div>
                <div>+91 {story.story.mobile}</div>
               {/*  <div>urname@email.com</div> */}
              </div>
            </div>

            <div className={styles.contactItem}>
              <div  className={styles.iconBox}>
              <FaMapMarkerAlt className={styles.icon} />

              </div>
              <div>
                <div>{story.story.village}</div>
                <div>{story.story?.dist}</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.profileContainer}>
            <img src={story.story.image.url} alt="Michal Johnson" className={styles.profileImage} />
          </div>
          <div className={styles.nameSection}>
            <h2 className={styles.name}>
              {story.story.name.split(' ')[0]} <span className={styles.lastName}>{story.story.name.split(' ')[1]}</span> {story.story.name.split(' ')[2]}
            </h2>
            <p className={styles.title}>{story.story.profession}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessCard4
