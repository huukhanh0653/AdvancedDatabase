import Hero from "../components/Hero"
import NewsLetter from "../components/NewsLetter"
import Offer from "../components/Offer"
import Popular from "../components/Popular"


const Home = () => {
  return (
    <>
      <main className="bg-primary text-tertiary">
        <Hero />
        <Popular />
        <Offer />
      </main>
    </>
  )
}

export default Home