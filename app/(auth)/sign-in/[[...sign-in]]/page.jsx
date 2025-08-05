// import SignIn from '@clerk/nextjs'
import { SignIn } from '@clerk/nextjs'; // ✅ CORRECT


export default function Page() {
  return(
    <div className='flex items-center justify-center h-screenx1' >
      <SignIn />
    </div>
  )
}