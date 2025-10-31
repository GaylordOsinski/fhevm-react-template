import { NextRequest, NextResponse } from 'next/server';

/**
 * Homomorphic Computation API Route
 * Handles computation validation on encrypted data
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { operation, operands, contractAddress } = body;

    if (!operation || !operands || !Array.isArray(operands)) {
      return NextResponse.json(
        { error: 'Operation and operands array are required' },
        { status: 400 }
      );
    }

    // Validate computation request
    // Actual computation happens on-chain
    const supportedOps = ['add', 'sub', 'mul', 'div', 'eq', 'ne', 'gt', 'lt'];

    if (!supportedOps.includes(operation)) {
      return NextResponse.json(
        { error: `Unsupported operation. Supported: ${supportedOps.join(', ')}` },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      operation,
      operandCount: operands.length,
      message: 'Computation request validated',
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Computation API error:', error);
    return NextResponse.json(
      { error: 'Failed to process computation request' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/fhe/compute',
    description: 'Validate homomorphic computation requests',
    supportedOperations: ['add', 'sub', 'mul', 'div', 'eq', 'ne', 'gt', 'lt'],
  });
}
