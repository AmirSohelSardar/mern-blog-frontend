import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';

export default function Header() {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) setSearchTerm(searchTermFromUrl);
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/signout`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    navigate(`/search?${urlParams.toString()}`);
  };

  return (
    <>
      {/* ---------------- NAVBAR ---------------- */}
      <Navbar className="border-b-2 fixed top-0 w-full z-50 bg-white dark:bg-slate-900">

        {/* LOGO */}
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Growth
          </span>
          Hub
        </Link>

        {/* DESKTOP SEARCH */}
        <form
          onSubmit={handleSubmit}
          className="relative hidden lg:flex items-center"
        >
          <TextInput
            type="text"
            placeholder="Search..."
            className="pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="absolute right-2 text-gray-500 hover:opacity-70"
          >
            🔍
          </button>
        </form>

        {/* MOBILE SEARCH TOGGLE BUTTON */}
        <Button
          className="w-12 h-10 lg:hidden"
          color="gray"
          pill
          onClick={() => setShowMobileSearch(!showMobileSearch)}
        >
          🔍
        </Button>

        {/* RIGHT SIDE BUTTONS */}
        <div className="flex gap-2 md:order-2">

          {/* THEME TOGGLE */}
          <Button
            className="w-12 h-10"
            color="gray"
            pill
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === 'light' ? <FaSun /> : <FaMoon />}
          </Button>

          {/* PROFILE / SIGN IN */}
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="user"
                  img={currentUser.profilePicture}
                  rounded
                  onError={(e) => {
                    if (e.target.src !== '/default-avatar.png') {
                      e.target.src = '/default-avatar.png';
                    }
                  }}
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block text-sm font-medium truncate">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Link to="/dashboard?tab=profile">
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/sign-in">
              <Button gradientDuoTone="purpleToBlue" outline>
                Sign In
              </Button>
            </Link>
          )}

          <Navbar.Toggle />
        </div>

        {/* NAV LINKS */}
        <Navbar.Collapse>
          <Navbar.Link active={path === '/'} as="div">
            <Link to="/">Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/about'} as="div">
            <Link to="/about">About</Link>
          </Navbar.Link>
          
          <Navbar.Link active={path === '/contact'} as={'div'}>
  <Link to='/contact'>Contact</Link>
</Navbar.Link>

        </Navbar.Collapse>

      </Navbar>

      {/* ---------------- MOBILE SEARCH BAR ---------------- */}
      {showMobileSearch && (
        <form
          onSubmit={handleSubmit}
          className="p-3 flex lg:hidden gap-2 bg-white dark:bg-slate-900 border-b mt-[65px]"
        >
          <TextInput
            type="text"
            placeholder="Search..."
            className="w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            type="submit"
            className="px-4 rounded bg-gray-200 dark:bg-gray-700"
          >
            🔍
          </button>
        </form>
      )}
    </>
  );
}
