import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

export default function PrivacyPage() {
  return (
    <div>
      <h1>Privacy Page</h1>
      <Button>
        <Link href="/">Home</Link>
      </Button>
    </div>
  )
}
