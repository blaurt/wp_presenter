<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wpdev');

/** MySQL database username */
define('DB_USER', 'wpdev');

/** MySQL database password */
define('DB_PASSWORD', 'wpdev');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'yZ},1wchvsa)9exszurv7~SUX]ck[(EVW.]$gnkqf6$_.I&ZNiAzuqs_f9]Z%Z;T');
define('SECURE_AUTH_KEY',  'LJj-W1&_=M@>/PLI^,o34-D y?]0,^Cs.0OW,j>xdl8J<0u* m@eRmb@q`X=__[1');
define('LOGGED_IN_KEY',    'YIB(#0kP0mJzDo3=a8BU|ExgW:Ijrz$6=O+SLsDorAxjgQO0^7i599YT-`:~rM%6');
define('NONCE_KEY',        ']~T)g8#P=w|5;ZL^$R]V8Jpe;LST Qoz]zv0M#1a8sR!xB.NhJkrp%/]SZ01 %.w');
define('AUTH_SALT',        'ndWN0r~}:?Vw;trr.S,03HeW%shHl[T?G$M9VQ,ZxujByF-f/a/6Aesou[G38)!&');
define('SECURE_AUTH_SALT', 'n(PLr,2V(=C(*t7#^nw1xq>Fw_1|5jOtN`t j:@,T;rc0#<!EDzo#-?pV/e<e=ny');
define('LOGGED_IN_SALT',   '-f*OmkTN0%Vwz6@K(z{Mk-gq019wK2J~L>A;^f[A0Imskk^V14qDOTT}@5Og)Jad');
define('NONCE_SALT',       'E1y_UT2x94Y%A90c8~-)`h!vI^-{ic5)WCu$6Rs1O5Q*_Am*xD5d=/FeD;AWEw|}');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
