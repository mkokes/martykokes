<?php

if (file_exists(dirname(__FILE__) . '/wp-config-local.php')) {
	require_once(dirname(__FILE__) . '/wp-config-local.php');
} else {
    define('DB_NAME', 'martykokes_wp');
    define('DB_USER', 'martykokes_sa');
    define('DB_PASSWORD', 'Ij_=-?jXNfU=IT#fTgHsdf2^72%XhFdR');
    define('DB_HOST', 'localhost');
    define('DB_CHARSET', 'utf8');
    define('DB_COLLATE', '');

    define('WP_DEBUG', false);
    define('WP_DEBUG_LOG', false);
    define('WP_DEBUG_DISPLAY', false);

}

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'AR^lWpCvIT1*G]xMiuI}4H||QLmV_qdB*T-O#wE3]Y3(--Q+zNz?k&1PXU*.gd<5');
define('SECURE_AUTH_KEY',  'e:L3z`2_NQ+[Pe_%H@uH=u%f*ETW<jDzjmud.CX.U -fDZ%ZeuF(I7r1mQP;,UWy');
define('LOGGED_IN_KEY',    '_C}OtdLe[ZA..P3&7(u|&&HNK 6ryIIIV+$F`7xX@&`6Dj_Gsu`fj*&f{BAJ5xo*');
define('NONCE_KEY',        't|E!9M--NT#!L!X/mSKf+{*)gmxNl8@j>w5/&3t};@F9}ezuT[V,d^IWmMi$9nIY');
define('AUTH_SALT',        '2OK&r<9qk4!4&[LS=mFb]F:w}-[7W2q[2 UwphGqT~uj$1Ks7E%F~vdy}j)tW-mg');
define('SECURE_AUTH_SALT', '}8c.Y|O)[@~=3Dw-?-MQ4pkBT$/R3w8?[|T9jMvRku0q`m.!|`}(5<O`)33?KP_1');
define('LOGGED_IN_SALT',   '#)F~L45RRV+G*q+KhB=S]=O|c@VvG|v56=xazgokk@?k[krT%n_CNxl,ZYz,uc-@');
define('NONCE_SALT',       '-jM%P8:h-89&1}HyV}1CF2YY@knC0|/nng BumkG}jsV>+3U +5}S dkn-BO|ATI');

$table_prefix = 'wp_';

if ( ! defined( 'ABSPATH' ) )
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );

require_once ABSPATH . 'wp-settings.php';
