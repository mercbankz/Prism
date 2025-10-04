import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const AlertSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  eventKey: z.string().min(1, 'Event key is required'),
  symbol: z.string().optional(),
  at: z.string().datetime('Invalid date format'),
  deliverEmail: z.boolean().default(false),
  deliverWeb: z.boolean().default(true),
  message: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = AlertSchema.parse(body)
    
    // In a real application, you would save this to a database
    // For now, we'll just return a success response
    const alert = {
      id: `alert_${Date.now()}`,
      userId: 'user_123', // In real app, get from auth
      ...validatedData,
      createdAt: new Date().toISOString()
    }
    
    // Simulate saving to database
    console.log('Alert created:', alert)
    
    return NextResponse.json({ 
      success: true, 
      alert,
      message: 'Alert created successfully' 
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Alert creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create alert' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // In a real application, you would fetch from database
    // For now, return mock data
    const alerts = [
      {
        id: 'alert_1',
        title: 'CPI Release',
        eventKey: 'cpi_release',
        symbol: null,
        at: '2024-01-15T08:30:00Z',
        deliverEmail: true,
        deliverWeb: true,
        message: 'CPI data released - check portfolio impact',
        createdAt: '2024-01-10T10:00:00Z'
      },
      {
        id: 'alert_2',
        title: 'Fed Meeting',
        eventKey: 'fed_meeting',
        symbol: null,
        at: '2024-01-31T14:00:00Z',
        deliverEmail: false,
        deliverWeb: true,
        message: 'Fed meeting - potential rate changes',
        createdAt: '2024-01-12T15:30:00Z'
      }
    ]
    
    return NextResponse.json({ success: true, alerts })
  } catch (error) {
    console.error('Failed to fetch alerts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch alerts' },
      { status: 500 }
    )
  }
}
