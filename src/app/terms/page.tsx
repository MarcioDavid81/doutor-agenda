
import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

export default function TermsPage() {
  return (
    <div>
      <h1>Terms Page</h1>
      <Button>
        <Link href="/">Home</Link>
      </Button>
    </div>
  )
}
