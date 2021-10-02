const mongoose = require("mongoose");

const sellerSchema = mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    sellerStatus: {
      type: Boolean,
      default: true,
    },
    seller: {
      name: {
        type: String,
        required: [true, "Please Provide Name"],
      },
      email: {
        type: String,
        required: [true, "Please Provide email"],
      },
      phoneNumber: {
        type: Number,
        required: [true, "Please Provide number"],
      },
      address: {
        type: String,
        required: [true, "Please Provide address"],
      },
      profileImg: {
        type: String,
        default: "",
      },
      nidCard: {
        type: String,
        default: "",
      },
    },
    storeInformation: {
      storeName: {
        type: String,
        required: [true, "Store name required"],
      },
      storeLogo: {
        type: String,
        default: "",
      },
      storeBanner: {
        type: String,
        default: "",
      },
      storeDetails: {
        type: String,
        required: [true, "Store details required"],
      },
      storeLicense: {
        type: String,
        required: [true, "Store license required"],
      },
      storeAddress: {
        type: String,
        required: [true, "Store address required"],
      },
      wifiPassword: {
        type: String,
        default: "",
      },
    },
    promoCode: [
      {
        id: {
          type: String,
          required: [true, "Id is required"],
        },
        code: {
          type: String,
          required: [true, "Code is required"],
        },
        status: {
          type: Boolean,
          default: false,
        },
      },
    ],
    review: [
      {
        customerId: {
          type: String,
          required: [true, "customer id is required"],
        },
        reviewMessage: {
          type: String,
          default: "",
        },
        reviewRating: {
          type: Number,
          required: [true, "rating is required"],
        },
        reviewImg: {
          type: String,
          default: "",
        },
        reviewTime: {
          type: String,
          default: Date.now(),
        },
      },
    ],
    foods: [
      {
        _id: {
          type: String,
          default: Date.now(),
        },
        name: {
          type: String,
          required: [true, "Foods name required"],
        },
        img: {
          type: String,
          default: "",
        },
        details: {
          type: String,
          required: [true, "Foods details required"],
        },
        category: {
          type: String,
          required: [true, "Foods category required"],
        },
        price: {
          type: Number,
          required: [true, "Foods price required"],
        },
        status: {
          type: Boolean,
          default: true,
        },
        dineIn: {
          type: Boolean,
          default: true,
        },
        reservation: {
          type: Boolean,
          default: false,
        },
        foodPickUp: {
          type: Boolean,
          default: true,
        },
        foodDelivery: {
          type: Boolean,
          default: true,
        },
        reviews: [
          {
            customerId: {
              type: String,
              required: [true, "customer id is required"],
            },
            reviewMessage: {
              type: String,
              default: "",
            },
            reviewRating: {
              type: Number,
              required: [true, "rating is required"],
            },
            reviewImg: {
              type: String,
              default: "",
            },
            reviewTime: {
              type: String,
              default: Date.now(),
            },
          },
        ],
      },
    ],
    reservations: [
      {
        _id: {
          type: String,
          default: Date.now(),
        },
        name: {
          type: String,
          required: [true, "Reservation name required"],
        },
        img: {
          type: String,
          default: "",
        },
        details: {
          type: String,
          required: [true, "Reservation details required"],
        },
        category: {
          type: String,
          required: [true, "Reservation category required"],
        },
        price: {
          type: Number,
          required: [true, "Reservation price required"],
        },
        status: {
          type: Boolean,
          default: true,
        },
        availableSeat: {
          type: Number,
          required: [true, "seat is required"],
        },
        reviews: [
          {
            customerId: {
              type: String,
              required: [true, "customer id is required"],
            },
            reviewMessage: {
              type: String,
              default: "",
            },
            reviewRating: {
              type: Number,
              required: [true, "rating is required"],
            },
            reviewImg: {
              type: String,
              default: "",
            },
            reviewTime: {
              type: String,
              default: Date.now(),
            },
          },
        ],
      },
    ],
  },
  {
    versionKey: false,
  }
);

module.exports = sellerSchema;
