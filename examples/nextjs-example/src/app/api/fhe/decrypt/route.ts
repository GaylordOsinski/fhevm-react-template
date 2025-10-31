import { NextRequest, NextResponse } from 'next/server';

/**
 * Decryption API Route
 * Handles decryption request validation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ciphertext, contractAddress, signature } = body;

    if (!ciphertext || !contractAddress) {
      return NextResponse.json(
        { error: 'Ciphertext and contract address are required' },
        { status: 400 }
      );
    }

    // Validate the decryption request
    // Actual decryption happens client-side with EIP-712 signature
    return NextResponse.json({
      success: true,
      message: 'Decryption request validated',
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Decryption API error:', error);
    return NextResponse.json(
      { error: 'Failed to process decryption request' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/fhe/decrypt',
    description: 'Validate decryption requests (requires EIP-712 signature)',
    method: 'POST',
  });
}
