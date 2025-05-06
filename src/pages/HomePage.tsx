import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/HomePage.module.css";

const HomePage: React.FC = () => {
  const events = [
    {
      id: "1",
      name: "Прибирання парку",
      date: "15 травня 2024",
      time: "10:00 - 14:00",
      location: "Парк Перемоги, Київ",
      organization: "Екологічна ініціатива",
      description:
        "Допоможіть нам зробити наш парк чистішим та привабливішим для всіх відвідувачів.",
      detailedDescription:
        "Приєднуйтесь до нашої екологічної ініціативи з прибирання парку. Ми надамо всі необхідні інструменти та засоби захисту. Після прибирання заплановано пікнік для всіх учасників.",
      requirements: "Зручний одяг, закриті взуття, рукавички (надаються)",
      contactPerson: "Олена Коваленко",
      contactEmail: "elena@ecoinitiative.org",
      imageUrl: "/photo_2024-04-18_02-14-36.jpg",
      comments: [
        {
          id: 1,
          author: "Марія Іваненко",
          date: "2 дні тому",
          text: "Чудова ініціатива! Обов'язково прийду з друзями.",
        },
        {
          id: 2,
          author: "Петро Сидоренко",
          date: "вчора",
          text: "Чи потрібно реєструватися заздалегідь?",
        },
      ],
    },
    {
      id: "2",
      name: "Допомога безпритульним тваринам",
      date: "20 травня 2024",
      time: "11:00 - 16:00",
      location: "Притулок для тварин, Львів",
      organization: 'Тваринний притулок "Друзі"',
      description:
        "Допоможіть нам доглядати за безпритульними тваринами та знаходити їм нові домівки.",
      detailedDescription:
        "Притулок потребує допомоги з вигулом собак, годуванням, прибиранням території та соціалізацією тварин. Також потрібна допомога з організацією фотосесій для пошуку нових господарів.",
      requirements: "Любов до тварин, зручний одяг, закриті взуття",
      contactPerson: "Андрій Мельник",
      contactEmail: "andriy@animalfriends.org",
      imageUrl: "/photo_2024-04-18_02-14-36.jpg",
      comments: [
        {
          id: 1,
          author: "Ольга Петренко",
          date: "3 дні тому",
          text: "Чудова можливість допомогти тваринам!",
        },
      ],
    },
  ];

  return (
    <div className={styles.homeContainer}>
      <div className={styles.content}>
        <h1 className={styles.title}>Ласкаво просимо до VolonteerHub</h1>
        <p className={styles.subtitle}>
          Знаходьте цікаві волонтерські події та допомагайте своїй спільноті
        </p>
        <div className={styles.buttons}>
          <button className={`btn btn-primary ${styles.button}`}>
            Знайти події
          </button>
          <button className={`btn btn-outline-primary ${styles.button}`}>
            Дізнатися більше
          </button>
        </div>
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-12 mb-4">
            <h1 className="text-center">Актуальні події</h1>
          </div>
        </div>
        <div className="row">
          {events.map((event) => (
            <div key={event.id} className="col-md-6 col-xl-4 mb-4">
              <EventCard {...event} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
