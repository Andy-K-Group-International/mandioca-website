import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// TODO: Uncomment when ready to use Supabase
// import { createServerSupabaseClient } from '@/lib/supabase'

// Initialize Resend lazily to avoid build-time errors
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set')
  }
  return new Resend(apiKey)
}

// Room type mapping for email
const roomTypes: Record<string, string> = {
  '1': '8 Bed Mixed Dorm ($12/night)',
  '2': '12 Bed Mixed Dorm ($10/night)',
  '3': 'Private Room - King Bed ($30/night)',
  '4': 'Private Twin Room ($35/night)',
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      'hostel_id',
      'room_id',
      'guest_name',
      'guest_email',
      'guest_phone',
      'check_in',
      'check_out',
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.guest_email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate dates
    const checkIn = new Date(body.check_in)
    const checkOut = new Date(body.check_out)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (checkIn < today) {
      return NextResponse.json(
        { error: 'Check-in date cannot be in the past' },
        { status: 400 }
      )
    }

    if (checkOut <= checkIn) {
      return NextResponse.json(
        { error: 'Check-out date must be after check-in date' },
        { status: 400 }
      )
    }

    const bookingData = {
      hostel_id: body.hostel_id,
      room_id: body.room_id,
      guest_name: body.guest_name,
      guest_email: body.guest_email,
      guest_phone: body.guest_phone || 'Not provided',
      check_in: body.check_in,
      check_out: body.check_out,
      guest_count: body.guest_count || 1,
      total_price: body.total_price || 0,
    }

    // Calculate nights
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))

    // Get Resend client
    const resend = getResendClient()

    // Send email notification to hostel
    const { error: emailError } = await resend.emails.send({
      from: 'Mandioca Hostel <bookings@mandiocahostel.com>',
      to: ['info@mandiocahostel.com'],
      replyTo: bookingData.guest_email,
      subject: `🛏️ New Booking Request - ${bookingData.guest_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #0A4843; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">🏨 New Booking Request</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">Mandioca Hostel</p>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border: 1px solid #e5e5e5;">
            <h2 style="color: #0A4843; margin-top: 0;">Guest Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;"><strong>Name:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">${bookingData.guest_name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;"><a href="mailto:${bookingData.guest_email}">${bookingData.guest_email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;"><a href="tel:${bookingData.guest_phone}">${bookingData.guest_phone}</a></td>
              </tr>
            </table>

            <h2 style="color: #0A4843; margin-top: 24px;">Booking Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;"><strong>Room:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">${roomTypes[bookingData.room_id] || bookingData.room_id}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;"><strong>Check-in:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">${bookingData.check_in}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;"><strong>Check-out:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">${bookingData.check_out}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;"><strong>Nights:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">${nights}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;"><strong>Guests:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">${bookingData.guest_count}</td>
              </tr>
              <tr style="background-color: #F7B03D20;">
                <td style="padding: 12px 8px;"><strong style="font-size: 18px;">Total:</strong></td>
                <td style="padding: 12px 8px;"><strong style="font-size: 18px; color: #0A4843;">$${bookingData.total_price}</strong></td>
              </tr>
            </table>
          </div>

          <div style="background-color: #0A4843; color: white; padding: 15px; border-radius: 0 0 8px 8px; text-align: center;">
            <p style="margin: 0; font-size: 14px;">Reply to this email to contact the guest directly</p>
          </div>
        </div>
      `,
    })

    if (emailError) {
      console.error('Resend error:', emailError)
      return NextResponse.json(
        { error: 'Failed to send booking notification. Please try again.' },
        { status: 500 }
      )
    }

    // Send confirmation email to guest
    await resend.emails.send({
      from: 'Mandioca Hostel <bookings@mandiocahostel.com>',
      to: [bookingData.guest_email],
      subject: `✅ Booking Request Received - Mandioca Hostel`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #0A4843; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Thank you, ${bookingData.guest_name}!</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">We've received your booking request</p>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border: 1px solid #e5e5e5;">
            <p style="color: #333; line-height: 1.6;">
              Thank you for choosing Mandioca Hostel! We've received your booking request and will confirm your reservation shortly.
            </p>

            <h2 style="color: #0A4843;">Your Booking Summary</h2>
            <div style="background-color: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e5e5;">
              <p style="margin: 8px 0;"><strong>Room:</strong> ${roomTypes[bookingData.room_id] || bookingData.room_id}</p>
              <p style="margin: 8px 0;"><strong>Check-in:</strong> ${bookingData.check_in} (from 1:00 PM)</p>
              <p style="margin: 8px 0;"><strong>Check-out:</strong> ${bookingData.check_out} (by 12:00 PM)</p>
              <p style="margin: 8px 0;"><strong>Guests:</strong> ${bookingData.guest_count}</p>
              <p style="margin: 8px 0;"><strong>Total:</strong> <span style="color: #0A4843; font-weight: bold;">$${bookingData.total_price}</span></p>
            </div>

            <h2 style="color: #0A4843; margin-top: 24px;">What's Next?</h2>
            <ol style="color: #333; line-height: 1.8;">
              <li>We'll review your request and send a confirmation within 24 hours</li>
              <li>Payment is due upon arrival (cash, credit, or debit card)</li>
              <li>If you have any questions, just reply to this email!</li>
            </ol>

            <div style="background-color: #F7B03D20; padding: 15px; border-radius: 8px; margin-top: 20px;">
              <h3 style="color: #0A4843; margin-top: 0;">📍 Our Location</h3>
              <p style="margin: 0;">Av. Colón 1090, Asunción, Paraguay</p>
              <a href="https://www.google.com/maps/dir/?api=1&destination=-25.2855854,-57.6497056" style="color: #0A4843;">Get Directions →</a>
            </div>
          </div>

          <div style="background-color: #0A4843; color: white; padding: 15px; border-radius: 0 0 8px 8px; text-align: center;">
            <p style="margin: 0 0 10px;">Questions? Contact us:</p>
            <p style="margin: 0;">
              <a href="https://wa.me/5493704951772" style="color: #F7B03D; text-decoration: none;">WhatsApp</a> |
              <a href="mailto:info@mandiocahostel.com" style="color: #F7B03D; text-decoration: none;">Email</a> |
              <a href="https://instagram.com/hostelmandioca1090" style="color: #F7B03D; text-decoration: none;">Instagram</a>
            </p>
          </div>
        </div>
      `,
    })

    /* ============================================
     * TODO: SUPABASE DATABASE INTEGRATION
     * Uncomment the code below when ready to save bookings to database
     * ============================================

    const supabase = createServerSupabaseClient()

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured. Please set up Supabase credentials.' },
        { status: 503 }
      )
    }

    const dbBookingData = {
      hostel_id: body.hostel_id,
      room_id: body.room_id,
      guest_name: body.guest_name,
      guest_email: body.guest_email,
      guest_phone: body.guest_phone || null,
      check_in: body.check_in,
      check_out: body.check_out,
      guest_count: body.guest_count || 1,
      total_price: body.total_price || 0,
      status: 'pending',
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert(dbBookingData)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to create booking. Please try again.' },
        { status: 500 }
      )
    }

    * ============================================ */

    return NextResponse.json(
      {
        message: 'Booking request received successfully',
        booking: bookingData,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/* ============================================
 * TODO: SUPABASE GET ENDPOINT
 * Uncomment when ready to fetch bookings from database
 * ============================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const hostelId = searchParams.get('hostel_id')
    const email = searchParams.get('email')

    const supabase = createServerSupabaseClient()

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    let query = supabase.from('bookings').select('*')

    if (hostelId) {
      query = query.eq('hostel_id', hostelId)
    }

    if (email) {
      query = query.eq('guest_email', email)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch bookings' },
        { status: 500 }
      )
    }

    return NextResponse.json({ bookings: data })
  } catch (error) {
    console.error('Fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

* ============================================ */
