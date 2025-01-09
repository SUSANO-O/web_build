import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const layout = await request.json()
    // Aquí puedes implementar la lógica para guardar el layout en una base de datos
    // Por ahora, solo simularemos un guardado exitoso
    console.log('Layout saved:', layout)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving layout:', error)
    return NextResponse.json({ success: false, error: 'Failed to save layout' }, { status: 500 })
  }
}

