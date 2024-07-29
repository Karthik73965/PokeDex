import { NextRequest, NextResponse } from 'next/server';
import { getIdAcessToken } from '@/utils/jose';
import { cookies } from 'next/headers';


export async function middleware(req: NextRequest) {
  const token = cookies().get("token")?.value;
  console.log("token ==== ", token)



  if (token) {    
    const id = await getIdAcessToken(token);
    if (id) {
      console.log(id)
      return NextResponse.redirect(new URL("/", req.url), {
        status: 303,
      });
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/login" , '/signup' ],
};
