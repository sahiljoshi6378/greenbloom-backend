import mongooes from "mongoose";



// Product schems
const productSchema = new mongooes.Schema({
    PID : {
        type:String,
        unique:true,
        required:true,
    },
    
    // quick_product_details
    hero_section_details:{
        original_title:{
            type:String,
            required:true
        },
        brand_name:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        sub_category:{
            type:String,
            required:true
        },
        perma_link:{
            type:String,
            required:true
        }
    },


    // product_price_info
    price_component:{
        original_mrp_inc_tax :{
            type:Number,
            required:true
        },
        tax_slab:{
            type:Number,
            required:true
        },
        dis_percent:{
            type:Number,
            default:0
        },
        price_after_dis:{
            type:Number,
            required:true
        },
        currency_sombol:{
            type:String,
            required:true
        },
        is_on_sale:{
            type:Boolean,
            default:false,
            required:true
        },
        special_sale_tag:{
            type:String,
            default:""
        }
    },


    // product media info
    product_media:{
        thumbnail_img :{
            type:String,
            required:true
        },
        thumbnail_alt_txt : {
            type:String,
            default:"Not-Available",
            required:true
        },
        thumbnail_dimenssions : {
            height : {type:Number},
            width : {type:Number},
        },
        slider_images :[
            {
                image_url : {
                    type:String
                },
                img_alt : {
                    type:String
                },
                img_dimenssions : {
                    height : {type:Number},
                    width : {type:Number},
                }
            }
        ]
    },

    // available offers info
    avail_offers :[
        {
            offer_tag_img : {type:String},
            offer_title : {type:String},
            offer_type : {type:String},

            // actions related to the offer
            any_actions:[
                {
                    action_type:{type:String},
                    action_text : {type:String},
                    action_img:{type:String},
                    action_link:{type:String}
                }
            ]
        }
    ],


    // product_stock_info
    stock_component:{
        total_in_stock:{
            type:Number,
            required:true
        },
        price_per_peice:{
            type:Number,
            required:true
        },
        total_inventory_cost:{
            type:Number,
            required:true
        },
        tax_slab:{
            type:Number,
            default:0,
            required:true
        },
        total_tax_value:{
            type:Number,
            required:true
        },
        isAvailable:{
            type:Boolean,
            default:false,
            required:true
        },
        last_stock_updated:{
            type:Date,
            default:() => Date.now(),
            required:true
        }
    },


    
    // live_services_info
    srvices:[
        {
            service_txt:{
                type:String
            },
            img_url:{
                type:String
            },
            // actions related to the services
            any_actions:[
                {
                    action_type:{type:String},
                    action_text : {type:String},
                    action_img:{type:String},
                    action_link:{type:String}
                }
            ]
        }
        
    ],




    // product_meta_info
    meta_info:{
        min_required_points : {
            type:Number,
            default:5
        },
        long_desc:{
            type:String,
            required:true
        },
        highlights_points_arr:[
            {
              point_txt:{
                  type:String,
                  required:true
              }      
            }
        ],
        specifications_points:[
            {
                point_txt:{
                    type:String,
                    required:true
                }      
            }
        ]
    }


    // END_OF_THE_SCHEMA

})







// new product-modle instance
const ProductModle =  new mongooes.model("PRODUCT",productSchema);
// exporting default modle
export default ProductModle;