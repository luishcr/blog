import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.scss";

export default function Logo() {
  return (
    <div className={styles.logo}>
      <Link href="/">
        <a>
          <Image src="/images/Logo.png" alt="LOGO" width={55} height={55} />
        </a>
      </Link>
    </div>
  );
}
