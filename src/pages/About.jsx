import CallToAction from '../components/CallToAction';

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
            About GrowthHub
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
           <p>
  Welcome to <strong>GrowthHub</strong>! This blog was created by Amir Sohel Sardar as a personal space to share his journey, insights, and experiences. Amir is a final-year B.Tech CSE student, MERN stack developer, DSA problem solver, and a passionate SDE enthusiast who loves exploring new technologies and building projects.
</p>

<p>
  On GrowthHub, you'll find posts about technology, coding, personal growth, daily life reflections, career experiences, and the lessons Amir learns along the way. This blog is designed to be all-rounder, capturing both professional and personal experiences in one place.
</p>

<p>
  GrowthHub is a window into Amir’s journey — from learning new skills and experimenting with projects to reflecting on challenges, successes, and life experiences. It’s a space to share ideas, document growth, and inspire both yourself and others through personal stories.
</p>


          </div>
        </div>
        <div className='mt-10'>
          <CallToAction />
        </div>
      </div>
    </div>
  );
}