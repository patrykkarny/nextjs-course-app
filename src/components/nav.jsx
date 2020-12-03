/** @jsx jsx */
import { jsx } from 'theme-ui';
import Link from 'next/link';

const Nav = () => (
  <header
    sx={{
      height: '60px',
      width: '100vw',
      bg: 'primary',
      borderBottom: '1px solid',
      borderColor: 'primary',
    }}
  >
    <nav
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        variant: 'containers.page',
        height: '100%',
      }}
    >
      <Link href="/">
        <a sx={{ fontWeight: 'bold', fontSize: 4, cursor: 'pointer' }}>
          Sample app
        </a>
      </Link>

      <Link href="/notes">
        <a sx={{ color: 'text', fontSize: 3, cursor: 'pointer' }}>notes</a>
      </Link>

      <Link href="/about">
        <a sx={{ color: 'text', fontSize: 3, cursor: 'pointer' }}>about</a>
      </Link>

      <Link href="/gallery">
        <a sx={{ color: 'text', fontSize: 3, cursor: 'pointer' }}>gallery</a>
      </Link>

      <a
        sx={{ color: 'text', fontSize: 3, cursor: 'pointer' }}
        href={process.env.HELP_APP_URL}
      >
        Help
      </a>
    </nav>
  </header>
);

export default Nav;
