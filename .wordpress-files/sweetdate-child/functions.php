<?php

//$start_wp_theme_tmp



//wp_tmp


//$end_wp_theme_tmp
?>﻿<?php
/**
 * @package WordPress
 * @subpackage Sweetdate
 * @author SeventhQueen <themesupport@seventhqueen.com>
 * @since Sweetdate 1.0
 */


/**
 * Sweetdate Child Theme Functions
 * Add extra code or replace existing functions
*/

function get_wp_forms( object $data ) {
	global $wpdb;
	$rows = $wpdb->get_results( "SELECT * FROM `wp_posts` WHERE `post_type` LIKE 'wpforms'" );
	return $rows;
}

function save_wp_forms_result(WP_REST_Request  $request  ) {
	global $wpdb;
	$params = $request->get_params();
	$data = $params['data'];

    $fields = $data['fields'];

	$wpdb->insert('wp_wpforms_entries', array(
		'form_id' => $data['form_id'],
		'post_id' => $data['post_id'],
		'user_id' => $data['user_id'],
		'viewed' => $data['viewed'],
		'starred' => $data['starred'],
		'fields' => $data['fields_json'],
		'meta' => $data['meta'],
		'date' => $data['date'],
		'date_modified' => $data['date_modified'],
		'ip_address' => $data['ip_address'],
		'user_agent' => $data['user_agent'],
		'user_uuid' => $data['user_uuid']
	));

	$inserted_id = $wpdb->insert_id;


	if($inserted_id == 0)
	{
		return 'FAIL';
	}

	foreach ($fields as &$field) 
	{
		$wpdb-> insert('wp_wpforms_entry_fields', array(
			'entry_id' => $inserted_id,
			'form_id' => $field['form_id'],
			'field_id' => $field['field_id'],
			'value' => $field['value'],
			'date' => $field['date']));
	}

	return $inserted_id;
}

add_action( 'rest_api_init', function () {
	register_rest_route( 'api', '/wpforms/', array(
		'methods'  => 'GET',
		'callback' => 'get_wp_forms',
	) );
} );

add_action('rest_api_init', function () {
	register_rest_route( 'api', '/wpforms/', array(
		'methods'  => 'POST',
		'callback' => 'save_wp_forms_result',
	) );
} );







































add_action( 'init', function()
{
    remove_action( 'register_new_user',   'wp_send_new_user_notifications'         );
    add_action(    'register_new_user',   'wpse236122_send_new_user_notifications' );
} );

function wpse236122_send_new_user_notifications(  $user_id, $notify = 'user' )
{
    wp_send_new_user_notifications( $user_id, $notify );
}
if ( ! function_exists( 'wp_password_change_notification' ) ) :
    function wp_password_change_notification( $user ) {
        return;
    }
endif;
function wpdocs_theme_name_scripts() {
    wp_enqueue_script( 'my-skript', get_stylesheet_directory_uri() . '/skript.js', array('jquery'), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'wpdocs_theme_name_scripts' );

remove_action( 'bp_make_spam_user', 'xprofile_remove_data' );
remove_action( 'bp_make_spam_user', 'groups_remove_data_for_user' );
remove_action( 'bp_make_spam_user', 'friends_remove_data' );
remove_action( 'bp_make_spam_user', 'bp_blogs_remove_data' );
remove_action( 'bp_make_spam_user', 'bp_activity_spam_all_user_data' );
remove_action( 'bp_make_spam_user', 'bp_core_remove_data' );



function vivi_replace_font() {
	wp_deregister_style( 'muliregular' );
	wp_register_style('muliregular', 'https://fonts.googleapis.com/css?family=Muli&amp;subset=latin-ext');
  wp_enqueue_style( 'muliregular');
}
add_action( 'wp_enqueue_scripts', 'vivi_replace_font', 100 );

//change matching system
add_action('after_setup_theme','kleo_my_match');
function kleo_my_match() {
global $kleo_config;
$kleo_config['matching_fields']['starting_score'] = 1;
//If we want to match by members sex. values: 0|1
$kleo_config['matching_fields']['sex_match'] = 0;
//required for initial match. If the sex preference matches it will continue to the specified fields below
$kleo_config['matching_fields']['sex'] = 'Pohlaví';
$kleo_config['matching_fields']['looking_for'] = 'Hledám';
//sex percentage
$kleo_config['matching_fields']['sex_percentage'] = 32;
//single value fields like select, textbox,radio
/*$kleo_config['matching_fields']['single_value'] = array (
    'Marital status' => 20,
    'Country' => 5,
'City' => 5
);*/
//multiple values fields like multiple select or checkbox
$kleo_config['matching_fields']['multiple_values'] = array (
    //if (xprofile_get_field_data('koníčky - ideál', $userid1 ) == 'Stejně jako já' )   {echo "'koníčky' => 100" }
    //'Looking for' => 10,
);
//multiple values fields like multiple select or checkbox
$kleo_config['matching_fields']['JMK_values'] = array (
    'Kraj' => 8,
    'Město' => 4,
    'status' => 8,
    'Vzdělání' => 1,
    'Postava' => 1,
    'Vlasy' => 1,
    'bydlím' => 1,
    'víra' => 4,
    'mazlíček' => 4,
    'Životní postoj' => 4,
    'Postoj k práci a kariéře ' => 4,
    'Rozdělení rolí v rodině ' => 4,
    'Výchova dětí' => 4,
    'Postoj k věrnosti' => 4,
    'Postoj k sexu' => 4
    //'Looking for' => 10,
);

$kleo_config['matching_fields']['JMK_values_neg'] = array (
    'Děti' => 8,
    'Děti do budoucna' => 10,
    'Kouření' => 8,
    'Alkohol' => 8
);
}

add_action('after_setup_theme','compatibility_score');

	/**
	 * Calculate compatibility between members based on their profiles
	 *
	 * @param int|bool $userid1
	 * @param int|bool $userid2
	 *
	 * @return int
	 */
	function compatibility_score( $userid1 = false, $userid2 = false ) {
		global $kleo_config;

		if ( $userid1 && $userid2 ) {
			$score = $kleo_config['matching_fields']['starting_score'];

			//Sex match
			if ( ( isset( $kleo_config['matching_fields']['sex_match'] ) && $kleo_config['matching_fields']['sex_match'] == '1' )
			     || ! isset( $kleo_config['matching_fields']['sex_match'] )
			) {
				$field1_u1  = xprofile_get_field_data( $kleo_config['matching_fields']['sex'], $userid1 );
				$field12_u1 = xprofile_get_field_data( $kleo_config['matching_fields']['looking_for'], $userid1 );
				$field1_u2  = xprofile_get_field_data( $kleo_config['matching_fields']['sex'], $userid2 );
				$field12_u2 = xprofile_get_field_data( $kleo_config['matching_fields']['looking_for'], $userid2 );

				if ( $field1_u1 == $field12_u2 && $field12_u1 == $field1_u2 ) {
					$score += $kleo_config['matching_fields']['sex_percentage'];
				} //if no sex match, return the score
				else {
					if ( ( isset( $kleo_config['matching_fields']['sex_mandatory'] ) && $kleo_config['matching_fields']['sex_mandatory'] == 1 ) || ! isset( $kleo_config['matching_fields']['sex_mandatory'] ) ) {
						return $score;
					}
				}
			}

			//single fields match
			if ( is_array( $kleo_config['matching_fields']['single_value'] ) ) {
				foreach ( $kleo_config['matching_fields']['single_value'] as $key => $value ) {
					if ( xprofile_get_field_data( $key, $userid1 )
					     && xprofile_get_field_data( $key, $userid2 )
					     && xprofile_get_field_data( $key, $userid1 ) == xprofile_get_field_data( $key, $userid2 )
					) {
						$score += $value;
					}
				}
			}

			//multiple fields match
			if ( is_array( $kleo_config['matching_fields']['multiple_values'] ) ) {
				foreach ( $kleo_config['matching_fields']['multiple_values'] as $key => $value ) {
					$field1 = xprofile_get_field_data( $key, $userid1 );
					$field2 = xprofile_get_field_data( $key, $userid2 );
					if ( $field1 && $field2 ) {
						$intersect = array_intersect( (array) $field1, (array) $field2 );
						if ( count( $intersect ) >= 1 ) {
							$score += $value * count( $intersect );
						}
					}
				}
			}

      //JMK customizer
			if ( is_array( $kleo_config['matching_fields']['JMK_values'] ) ) {
				foreach ( $kleo_config['matching_fields']['JMK_values'] as $key => $value ) {
          $field1 = xprofile_get_field_data( $key.' - ideál', $userid1 );
					$field2 = xprofile_get_field_data( $key, $userid2 );
					if ( $field1 && $field2 ) {
						$intersect = array_intersect( (array) $field1, (array) $field2 );
						if ( count( $intersect ) >= 1 ) {
							$score += $value;// * count( $intersect );
						}
					}

				}
			}

      //JMK customizer - negative
			if ( is_array( $kleo_config['matching_fields']['JMK_values_neg'] ) ) {
				foreach ( $kleo_config['matching_fields']['JMK_values_neg'] as $key => $value ) {
					$field1 = xprofile_get_field_data( $key.' - ideál', $userid1 );
					$field2 = xprofile_get_field_data( $key, $userid2 );
					if ( $field1 && $field2 ) {
						$intersect = array_intersect( (array) $field1, (array) $field2 );
						if ( count( $intersect ) >= 1 ) {
							$score += $value;// * count( $intersect );
						} else {
              $score = $score*0.5;
            }
					}
				}
			}

          //hard criteria - sex
				  $field1 = xprofile_get_field_data( 'Pohlaví - ideál', $userid1 );
					$field2 = xprofile_get_field_data( 'Pohlaví', $userid2 );
					if ( $field1 && $field2 ) {
						$intersect = array_intersect( (array) $field1, (array) $field2 );
						if ( count( $intersect ) >= 1 ) {
							$score += 7;// * count( $intersect );
						}  else {
              $score = 0;
            }
					}

          //hard criteria  - Hledám
				  $field1 = xprofile_get_field_data( 'Hledám', $userid1 );
					$field2 = xprofile_get_field_data( 'Hledám', $userid2 );
					if ( $field1 && $field2 ) {
						$intersect = array_intersect( (array) $field1, (array) $field2 );
						if ( count( $intersect ) >= 1 ) {
							$score += 2;// * count( $intersect );
						}  else {
              $score = $score*0.5;
            }
					}




      //věk klienta - ideál
					$od = xprofile_get_field_data( 'Věk od' , $userid1 );
					$do = xprofile_get_field_data( 'Věk do' , $userid1 );
          $vek = 2020 - date("Y",strtotime(xprofile_get_field_data( 'Věk'  , $userid2 )));
					if ( $od && $do && $vek) {
							if (  $od <=  $vek && $vek <= $do ) {
							$score = $score*1.1;
						} elseif  (  $od-5 <=  $vek && $vek <= $do+5 ) {
							$score = $score*0.75;
            } else {
              $score = $score*0.2;
            }
					}

			$score = $score + 38;


			if ( $score > 100 ) {
				$score = 100;
			}

			return $score;
		}
	}

  //members page fields
add_action('after_setup_theme','kleo_my_member_data');
function kleo_my_member_data()
{
global $kleo_config;
//this is the details field, right now it take the "About me" field content
$kleo_config['bp_members_details_field'] = 'About me';
//this display the fields under the name, eq: 36 / Woman / Divorced / Berlin. Modify with the names of the fields you want to appear there
$kleo_config['bp_members_loop_meta'] = array(
'Pohlaví',
'Kraj'
);

}

// change email address
function xyz_filter_wp_mail_from($email){
return "noreply@tvojelaska.cz";
}

add_filter("wp_mail_from", "xyz_filter_wp_mail_from");


// Change email name
function xyz_filter_wp_mail_name( $name ){
	return 'TvojeLaska.cz';
}
add_filter( 'wp_mail_from_name', 'xyz_filter_wp_mail_name' );

setcookie('bp-members-scope', 'all', time()+3600 ,'/'); 
		