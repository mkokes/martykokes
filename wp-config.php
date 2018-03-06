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

// ** MySQL settings ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '21vNe73G1vBv0HLYZh6YAIeX/QsLpOoGpAaL3i/fChj95G2yQSbjM89epp/be9fTqVespAXYPLUWc8BLOgMlGg==');
define('SECURE_AUTH_KEY',  'IT2J1jOCiiMwBm8A5sNS2IMQCNtr9w2jFVYCnH73nNBOYJJiBE/5SU+FcVsyc3X17y+MQhR0o9G+iwAEhZUdPQ==');
define('LOGGED_IN_KEY',    'zGNQmxJ6TY9Ine2A0HE3vQYx4vnOz91dW6NGgakkDy9rj8I8Zx4/Nuyxodb5MHIvhxaYnjiupONRzQkSz4RhWw==');
define('NONCE_KEY',        'RAXUA59UX2kKub7cRiPij9LEYUPJVUfls7PUVnQx90uoBCy3g0M62uoRiOs428wYXizk3F3aVN3tFxLoafMOHw==');
define('AUTH_SALT',        '8HySfhAqMANFOSnFhIxDVgKfZ6ce7pO152MDrch2Ibm8rL+KkcVFY49bBfcRyznY3rMAzPevnBNeb8kJ2gzcXA==');
define('SECURE_AUTH_SALT', '+TDPpyNkoiDltFcSZj5xcMbktAB0xmG04LSOqm031Ls97SfyIy6yYcViWu7CH9cfT58ZC4V6yaaBYqg28cDDyQ==');
define('LOGGED_IN_SALT',   'gF52tcznPhpmS5PgS8CQCpJBum1Xon7XUypUZ3ozfMa3xshoLls/TgQBi04wO+AFVK/8VQkzuaANn54B5ns0PQ==');
define('NONCE_SALT',       '5rvcbAacrx5zg737B+jAH0t0Syx2GeIV04nxpk3FL4qrymVew/UmZF3e8mlF7G/c+UgLXBnBkWHSFLqzsD1Igg==');

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';





/* Inserted by Local by Flywheel. See: http://codex.wordpress.org/Administration_Over_SSL#Using_a_Reverse_Proxy */
if ( isset( $_SERVER['HTTP_X_FORWARDED_PROTO'] ) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https' ) {
	$_SERVER['HTTPS'] = 'on';
}
/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) )
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
