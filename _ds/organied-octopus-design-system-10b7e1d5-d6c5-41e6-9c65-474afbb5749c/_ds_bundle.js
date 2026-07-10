/* @ds-bundle: {"format":4,"namespace":"OrganiedOctopusDesignSystem_10b7e1","components":[{"name":"CartDrawer","sourcePath":"components/commerce/CartDrawer.jsx"},{"name":"CollectionNavItem","sourcePath":"components/commerce/CollectionNavItem.jsx"},{"name":"ProductThumb","sourcePath":"components/commerce/ProductThumb.jsx"},{"name":"ShopButton","sourcePath":"components/commerce/ShopButton.jsx"},{"name":"IconButton","sourcePath":"components/navigation/IconButton.jsx"},{"name":"MenuOverlay","sourcePath":"components/navigation/MenuOverlay.jsx"},{"name":"SiteFooter","sourcePath":"components/navigation/SiteFooter.jsx"},{"name":"SiteHeader","sourcePath":"components/navigation/SiteHeader.jsx"}],"sourceHashes":{"components/commerce/CartDrawer.jsx":"8c8c23f5d163","components/commerce/CollectionNavItem.jsx":"e0d53423faa6","components/commerce/ProductThumb.jsx":"3b49ec5185ca","components/commerce/ShopButton.jsx":"fbe949e1af61","components/navigation/IconButton.jsx":"26095c6865db","components/navigation/MenuOverlay.jsx":"aa71da5fb202","components/navigation/SiteFooter.jsx":"fc095d6f8d30","components/navigation/SiteHeader.jsx":"c3404cb586a5","ui_kits/storefront/HomeScreen.jsx":"fb1e9109f3ff"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.OrganiedOctopusDesignSystem_10b7e1 = window.OrganiedOctopusDesignSystem_10b7e1 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/commerce/CartDrawer.jsx
try { (() => {
// Right-side slide-out cart drawer with a dark scrim. Empty-state only on
// the live site (no persisted cart items were ever built) — pass children
// to render real line items.
function CartDrawer({
  open = false,
  onClose,
  children
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 40,
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--overlay-scrim)',
      cursor: 'pointer'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      background: 'var(--oo-white)',
      width: '100%',
      maxWidth: 480,
      minWidth: 320,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-sans)',
      letterSpacing: 'var(--tracking-tight)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body)',
      fontWeight: 500,
      margin: 0
    }
  }, "Cart"), /*#__PURE__*/React.createElement("a", {
    onClick: onClose,
    style: {
      fontSize: 'var(--text-body)',
      fontWeight: 500,
      cursor: 'pointer'
    }
  }, "Close")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, children || /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body)',
      fontWeight: 500,
      margin: 0
    }
  }, "Cart is empty"))));
}
Object.assign(__ds_scope, { CartDrawer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/CartDrawer.jsx", error: String((e && e.message) || e) }); }

// components/commerce/CollectionNavItem.jsx
try { (() => {
// Numbered collection link used in the "Discover Collection" index list
// (001 Luno / 002 Arco / 003 Vera). Active item is black with a black
// underline; inactive items sit in gray-50 with a gray-50 underline.
function CollectionNavItem({
  index,
  name,
  active = false,
  onClick
}) {
  return /*#__PURE__*/React.createElement("a", {
    onClick: onClick,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      width: '100%',
      padding: '16px 0',
      textDecoration: 'none',
      cursor: 'pointer',
      color: active ? 'var(--oo-black)' : 'var(--oo-gray-50)',
      borderBottom: active ? '1px solid var(--oo-black)' : '1px solid var(--oo-gray-50)',
      fontFamily: 'var(--font-sans)',
      letterSpacing: 'var(--tracking-tight)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body)',
      fontWeight: 500,
      margin: 0
    }
  }, index), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-collection)',
      lineHeight: 'var(--text-collection-line)',
      fontWeight: 500,
      margin: 0
    }
  }, name));
}
Object.assign(__ds_scope, { CollectionNavItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/CollectionNavItem.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ProductThumb.jsx
try { (() => {
// Portrait product photo (2:2.6) with an optional name caption beneath —
// used for hero side-thumbnails and the material-driven scroll cards.
function ProductThumb({
  src,
  alt = '',
  name,
  selected = false,
  onClick,
  width = 140
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: onClick,
    style: {
      display: 'block',
      cursor: onClick ? 'pointer' : 'default',
      outline: selected ? '2px solid var(--oo-black)' : '2px solid transparent',
      outlineOffset: '2px',
      transition: 'outline-color var(--duration-fast) ease'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      aspectRatio: '2/2.6',
      objectFit: 'cover',
      display: 'block',
      width: '100%'
    }
  })), name ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body)',
      fontWeight: 500,
      margin: 0,
      letterSpacing: 'var(--tracking-tight)'
    }
  }, name)) : null);
}
Object.assign(__ds_scope, { ProductThumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductThumb.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ShopButton.jsx
try { (() => {
// The brand's only button shape: a full-width black bar with the label on the
// left and a value (price, or any secondary label) pinned to the right.
function ShopButton({
  label = 'Shop now',
  value = '',
  onClick,
  href = '#',
  disabled = false
}) {
  const [hover, setHover] = React.useState(false);
  const style = {
    background: disabled ? 'var(--oo-gray-50)' : 'var(--action-bg)',
    color: 'var(--action-fg)',
    width: '100%',
    height: 'var(--control-height)',
    padding: `0 ${'var(--control-pad-x)'}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textDecoration: 'none',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--text-body)',
    fontWeight: 500,
    letterSpacing: 'var(--tracking-tight)',
    border: 'none',
    cursor: disabled ? 'default' : 'pointer',
    opacity: hover && !disabled ? 0.85 : 1,
    transition: `opacity var(--duration-fast) ease`,
    boxSizing: 'border-box'
  };
  return /*#__PURE__*/React.createElement("a", {
    href: disabled ? undefined : href,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: style
  }, /*#__PURE__*/React.createElement("span", null, label), value ? /*#__PURE__*/React.createElement("span", null, value) : null);
}
Object.assign(__ds_scope, { ShopButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ShopButton.jsx", error: String((e && e.message) || e) }); }

// components/navigation/IconButton.jsx
try { (() => {
// Bare hamburger / close control. `open` morphs the three bars into an X.
function IconButton({
  open = false,
  onClick,
  dark = false,
  'aria-label': ariaLabel = 'Menu'
}) {
  const barColor = dark ? 'var(--oo-white)' : 'var(--oo-black)';
  const barBase = {
    display: 'block',
    height: 2,
    background: barColor,
    transition: 'transform var(--duration-base) var(--ease-menu), opacity var(--duration-fast), width var(--duration-base), background var(--duration-base)'
  };
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    "aria-label": ariaLabel,
    style: {
      width: 44,
      height: 44,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...barBase,
      width: 28,
      transform: open ? 'translateY(8px) rotate(45deg)' : 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...barBase,
      width: open ? 28 : 20,
      opacity: open ? 0 : 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...barBase,
      width: 28,
      transform: open ? 'translateY(-8px) rotate(-45deg)' : 'none'
    }
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/navigation/MenuOverlay.jsx
try { (() => {
// Fullscreen black nav overlay that reveals via a circular clip-path from the
// hamburger's position (top-right). This IS the site's entire navigation —
// there is no persistent nav bar with visible links.
function MenuOverlay({
  open = false,
  links = [],
  description = '',
  social = [],
  onClose,
  copyright = '© 2025'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 35,
      background: 'var(--oo-black)',
      color: 'var(--oo-white)',
      clipPath: open ? 'circle(150% at calc(100% - 38px) 38px)' : 'circle(0px at calc(100% - 38px) 38px)',
      WebkitClipPath: open ? 'circle(150% at calc(100% - 38px) 38px)' : 'circle(0px at calc(100% - 38px) 38px)',
      transition: `clip-path var(--duration-menu) var(--ease-menu)`,
      pointerEvents: open ? 'auto' : 'none',
      display: 'grid',
      gridTemplateColumns: 'repeat(12,1fr)',
      gap: 16,
      padding: '24px',
      alignContent: 'space-between',
      fontFamily: 'var(--font-sans)',
      letterSpacing: 'var(--tracking-tight)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / 13',
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close menu",
    style: {
      width: 44,
      height: 44,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 26,
      height: 2,
      background: '#fff',
      transform: 'translate(-50%,-50%) rotate(45deg)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 26,
      height: 2,
      background: '#fff',
      transform: 'translate(-50%,-50%) rotate(-45deg)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / 8',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      marginLeft: 24
    }
  }, links.map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: l.href || '#',
    onClick: onClose,
    style: {
      color: '#fff',
      textDecoration: 'none',
      fontSize: 'var(--text-menu-link)',
      lineHeight: 'var(--text-menu-line)',
      fontWeight: 500,
      opacity: open ? 1 : 0,
      transform: open ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.5s ease ${0.12 + i * 0.07}s, transform 0.5s ease ${0.12 + i * 0.07}s`
    }
  }, l.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '9 / 13',
      alignSelf: 'end',
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body)',
      fontWeight: 500,
      margin: 0,
      lineHeight: 1.3,
      maxWidth: 320,
      color: 'var(--oo-gray-60)'
    }
  }, description)), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / 13',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginLeft: 24,
      marginRight: 24,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24
    }
  }, social.map((s, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: s.href || '#',
    style: {
      color: 'var(--oo-gray-60)',
      textDecoration: 'none',
      fontSize: 'var(--text-body)',
      fontWeight: 500
    }
  }, s.label))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body)',
      fontWeight: 500,
      margin: 0,
      color: 'var(--oo-gray-60)'
    }
  }, copyright)));
}
Object.assign(__ds_scope, { MenuOverlay });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/MenuOverlay.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteFooter.jsx
try { (() => {
// Full-width black footer grid: nav links, social, legal, copyright, and a
// full-bleed wordmark image across the bottom.
function SiteFooter({
  columns = [],
  logoSrc,
  copyright = '© 2025 Organied Octopus'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--oo-black)',
      padding: '16px 0',
      fontFamily: 'var(--font-sans)',
      letterSpacing: 'var(--tracking-tight)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12,1fr)',
      gap: 16,
      padding: '0 16px',
      alignItems: 'start'
    }
  }, columns.map((col, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      gridColumn: col.span || 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, col.links.map((l, j) => /*#__PURE__*/React.createElement("a", {
    key: j,
    href: l.href || '#',
    style: {
      color: '#fff',
      fontSize: 'var(--text-body)',
      fontWeight: 500,
      textDecoration: 'none'
    }
  }, l.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '10 / 13',
      justifySelf: 'end',
      color: '#fff',
      fontSize: 'var(--text-body)',
      fontWeight: 500
    }
  }, copyright), logoSrc ? /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      gridColumn: '1 / 13',
      display: 'flex',
      width: '100%',
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "Logo",
    style: {
      width: '100%',
      display: 'block'
    }
  })) : null));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteHeader.jsx
try { (() => {
// Fixed top bar: wordmark top-left, hamburger top-right. Transparent, sits
// above page content; the logo shrinks on scroll on the real site (omitted
// here as a static component — wire that behavior at the page level).
function SiteHeader({
  logoSrc,
  menuOpen = false,
  onToggleMenu,
  homeHref = '#'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 40,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: homeHref,
    style: {
      display: 'flex',
      alignItems: 'center',
      width: 200
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "Logo",
    style: {
      width: '100%',
      display: 'block',
      objectFit: 'contain'
    }
  })), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    open: menuOpen,
    onClick: onToggleMenu,
    "aria-label": "Menu"
  }));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/HomeScreen.jsx
try { (() => {
/**
 * @startingPoint section="UI Kits" subtitle="Organied Octopus storefront — homepage recreation" viewport="1440x900"
 */
const {
  SiteHeader,
  MenuOverlay,
  SiteFooter,
  CartDrawer,
  ShopButton,
  ProductThumb,
  CollectionNavItem
} = window.OrganiedOctopusDesignSystem_10b7e1;
const CDN = 'https://cdn.prod.website-files.com/67a7721e638cc64a55110750/';
const CDN2 = 'https://cdn.prod.website-files.com/67a766fea7b4c145250bc504/';
const HEROES = [{
  img: CDN + '67ad96ab106d8fb7eb7c1eab_1.webp',
  name: 'Luno Stool Blue',
  price: '$ 1,200.00 USD'
}, {
  img: CDN + '67ad96dcb08629ee808e5994_2.webp',
  name: 'Luno Shelf Red',
  price: '$ 3,500.00 USD'
}, {
  img: CDN + '67ad9afb0cd024e19c7378f8_3.webp',
  name: 'Luno Sofa Yellow',
  price: '$ 6,800.00 USD'
}];
const COLLECTIONS = [{
  name: 'Luno Sofa Yellow',
  price: '$ 6,800.00 USD',
  desc: 'A vibrant yellow sofa that brings warmth and energy.',
  img: CDN + '67ad9afb0cd024e19c7378f8_3.webp',
  img2: CDN + '67b1d61e5c80ce0e3e4394c1_3-2.webp'
}, {
  name: 'Arco Sofa Metal',
  price: '$ 7,500.00 USD',
  desc: 'A minimalist metal shelf with a refined industrial look.',
  img: CDN + '67ad9ba0de7bb305ceaf65f5_6.webp',
  img2: CDN + '67b1d5f084a678ab1b0efec3_6-2.webp'
}, {
  name: 'Vera Sofa Blue',
  price: '$ 7,000.00 USD',
  desc: 'A bold blue sofa that merges comfort with contemporary aesthetics.',
  img: CDN + '67ad9c39d7574971aad10695_9.webp',
  img2: CDN + '67b1d5c63fcfacb48ae7341d_9-2.webp'
}];
const MATERIAL_CARDS = [{
  name: 'Arco Shelf Metal',
  price: '$ 4,200.00 USD',
  img: CDN + '67ad9b7fdaa7aa4b594f62f4_5.webp'
}, {
  name: 'Arco Sofa Metal',
  price: '$ 7,500.00 USD',
  img: CDN + '67ad9ba0de7bb305ceaf65f5_6.webp'
}, {
  name: 'Arco Stool Metal',
  price: '$ 1,500.00 USD',
  img: CDN + '67ad9b4f3bd234953e76f057_4.webp'
}];
function HomeScreen() {
  const [hero, setHero] = React.useState(2);
  const [coll, setColl] = React.useState(0);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const h = HEROES[hero];
  const c = COLLECTIONS[coll];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      fontFamily: 'var(--font-sans)',
      color: 'var(--oo-black)',
      letterSpacing: 'var(--tracking-tight)',
      background: '#fff',
      overflowX: 'clip'
    }
  }, /*#__PURE__*/React.createElement(SiteHeader, {
    logoSrc: "../../assets/logos/icon-black.svg",
    menuOpen: menuOpen,
    onToggleMenu: () => setMenuOpen(v => !v)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 140,
      padding: '140px 16px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'hidden',
      aspectRatio: '2/2.6',
      height: 560,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: h.img,
    alt: h.name,
    style: {
      objectFit: 'cover',
      height: '100%',
      width: '100%'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 90,
      lineHeight: '95%',
      fontWeight: 500,
      margin: 0,
      maxWidth: 500
    }
  }, h.name), /*#__PURE__*/React.createElement(ShopButton, {
    label: "Shop now",
    value: h.price
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      right: 0,
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, HEROES.map((item, i) => /*#__PURE__*/React.createElement(ProductThumb, {
    key: i,
    width: 94,
    src: item.img,
    selected: hero === i,
    onClick: () => setHero(i)
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 180,
      display: 'flex',
      flexDirection: 'column',
      gap: 100
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12,1fr)',
      gap: 16,
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      gridColumn: '1 / 13',
      fontSize: 62,
      lineHeight: '100%',
      fontWeight: 500,
      margin: 0
    }
  }, "Organied Octopus is a material-driven minimalist furniture brand that embodies the structural order and functionality of Swiss graphic design.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12,1fr)',
      gap: 16,
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      gridColumn: '1 / 2',
      fontSize: 16,
      fontWeight: 500,
      margin: 0
    }
  }, "Vision"), /*#__PURE__*/React.createElement("p", {
    style: {
      gridColumn: '5 / 9',
      fontSize: 22,
      fontWeight: 500,
      margin: 0,
      lineHeight: '120%'
    }
  }, "Redefining minimalism through material authenticity and design order. Organied Octopus moves beyond simple form, creating refined designs that shape spaces."))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 100,
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 16,
      fontWeight: 500,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("span", null, "Material"), /*#__PURE__*/React.createElement("span", null, "Driven")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 20
    }
  }, MATERIAL_CARDS.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("img", {
    src: m.img,
    alt: m.name,
    style: {
      aspectRatio: '2/2.6',
      objectFit: 'cover',
      width: '100%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 0'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      fontWeight: 500,
      margin: 0
    }
  }, m.name)), /*#__PURE__*/React.createElement(ShopButton, {
    label: "Shop now",
    value: m.price
  }))))), /*#__PURE__*/React.createElement("div", {
    id: "collection",
    style: {
      paddingTop: 100,
      display: 'flex',
      flexDirection: 'column',
      gap: 60
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 90,
      lineHeight: '95%',
      fontWeight: 500,
      margin: 0
    }
  }, "Discover", /*#__PURE__*/React.createElement("br", null), "Collection")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12,1fr)',
      gap: 16,
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / 5',
      display: 'flex',
      flexDirection: 'column'
    }
  }, COLLECTIONS.map((item, i) => /*#__PURE__*/React.createElement(CollectionNavItem, {
    key: i,
    index: '00' + (i + 1),
    name: item.name.split(' ')[0],
    active: coll === i,
    onClick: () => setColl(i)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '5 / 13',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      gridTemplateAreas: '"main side" "name side" "shop side"'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: c.img,
    alt: c.name,
    style: {
      gridArea: 'main',
      aspectRatio: '2/2.6',
      objectFit: 'cover',
      width: '100%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      gridArea: 'side',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: c.img2,
    alt: "",
    style: {
      aspectRatio: '2/2.6',
      objectFit: 'cover',
      width: '100%'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      fontWeight: 500,
      margin: 0,
      padding: '12px 0',
      maxWidth: 280
    }
  }, c.desc)), /*#__PURE__*/React.createElement("div", {
    style: {
      gridArea: 'name',
      display: 'flex',
      alignItems: 'center',
      padding: '12px 0'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      fontWeight: 500,
      margin: 0
    }
  }, c.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      gridArea: 'shop'
    }
  }, /*#__PURE__*/React.createElement(ShopButton, {
    label: "Shop now",
    value: c.price
  }))))), /*#__PURE__*/React.createElement("div", {
    id: "about",
    style: {
      paddingTop: 180,
      marginTop: 100
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12,1fr)',
      gap: 16,
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      gridColumn: '1 / 13',
      fontSize: 62,
      lineHeight: '100%',
      fontWeight: 500,
      margin: 0
    }
  }, "Inspired by the structural order and visual logic of Swiss graphic design, Organied Octopus applies these principles to furniture, shaping elements that seamlessly integrate into spaces.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '60px 16px 0'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      fontWeight: 500,
      margin: 0
    }
  }, "Artists"), /*#__PURE__*/React.createElement("img", {
    src: CDN2 + '67aeea2493e039a559fb6a2f_0_0%20(2).webp',
    alt: "Kei Rose",
    style: {
      width: 280,
      aspectRatio: '2/2.6',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      fontWeight: 500,
      margin: 0
    }
  }, "Designer")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '48px 16px'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 64,
      lineHeight: '95%',
      fontWeight: 500,
      margin: '0 auto 16px'
    }
  }, "Kei Rose"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      fontWeight: 500,
      margin: '0 auto',
      maxWidth: 350,
      lineHeight: '120%'
    }
  }, "Redefining minimalism through material authenticity and design order. Organied Octopus moves beyond simple form, creating refined designs that shape spaces."))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(SiteFooter, {
    logoSrc: "../../assets/logos/octopus-white.svg",
    columns: [{
      span: '1 / 4',
      links: [{
        label: 'Home'
      }, {
        label: 'Store'
      }, {
        label: 'Collection'
      }, {
        label: 'About'
      }, {
        label: 'Contact'
      }]
    }, {
      span: '4 / 7',
      links: [{
        label: 'Instagram'
      }, {
        label: 'Email'
      }]
    }, {
      span: '7 / 10',
      links: [{
        label: 'Licence'
      }, {
        label: 'Changelog'
      }, {
        label: 'Design system'
      }]
    }]
  })), /*#__PURE__*/React.createElement(MenuOverlay, {
    open: menuOpen,
    onClose: () => setMenuOpen(false),
    links: [{
      label: 'Store',
      href: '#collection'
    }, {
      label: 'Collection',
      href: '#collection'
    }, {
      label: 'About',
      href: '#about'
    }, {
      label: 'Contact'
    }],
    description: "Organied Octopus is a material-driven minimalist furniture brand inspired by Swiss graphic design.",
    social: [{
      label: 'Instagram'
    }, {
      label: 'Email'
    }]
  }), /*#__PURE__*/React.createElement(CartDrawer, {
    open: cartOpen,
    onClose: () => setCartOpen(false)
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCartOpen(true),
    style: {
      position: 'fixed',
      bottom: 24,
      right: 24,
      zIndex: 30,
      background: '#000',
      color: '#fff',
      border: 'none',
      padding: '10px 16px',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: 500,
      cursor: 'pointer'
    }
  }, "Open cart"));
}
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/HomeScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.CartDrawer = __ds_scope.CartDrawer;

__ds_ns.CollectionNavItem = __ds_scope.CollectionNavItem;

__ds_ns.ProductThumb = __ds_scope.ProductThumb;

__ds_ns.ShopButton = __ds_scope.ShopButton;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.MenuOverlay = __ds_scope.MenuOverlay;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

})();
