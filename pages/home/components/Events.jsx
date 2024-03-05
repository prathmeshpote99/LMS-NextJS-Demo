import events from '@/assets/images/data/event'
import EventCard from '@/components/EventCard'
import SectionHeader from '@/components/SectionHeader'

const Events = () => {
  return (
    <section className="events-section pt-100 pb-100 ">
      <div className="container">
        <SectionHeader
          subtitle="Training"
          title="Upskilling For Facilitators And Teams"
        />
        <div className="row g-4">
          {events &&
            events
              .map((item, i) => (
                <div className="col-md-6" key={i}>
                  <EventCard {...item} />
                </div>
              ))
              .slice(0, 2)}
        </div>
      </div>
    </section>
  )
}

export default Events
