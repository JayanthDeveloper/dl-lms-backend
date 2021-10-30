"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSS3Service = void 0;
const AWS = __importStar(require("aws-sdk"));
const fs = __importStar(require("fs"));
const config_1 = __importDefault(require("../config"));
class AWSS3Service {
    constructor() {
        this.s3Instance = new AWS.S3({
            accessKeyId: config_1.default.AWS_S3_ACCESS_KEY,
            secretAccessKey: config_1.default.AWS_SECRET_ACCESS_KEY
        });
        this.uploadFile = (file, name, folderName) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    fs.readFile(file.path, (error, data) => {
                        if (error)
                            reject(error);
                        const params = {
                            Bucket: config_1.default.AWS_S3_BUCKET_NAME,
                            Key: `${folderName}/${name}`,
                            Body: data,
                            ACL: 'public-read'
                        };
                        this.s3Instance.upload(params, (awsError, awsResponse) => {
                            // fs.unlink(file.path, (err) => {
                            //     if (err) {
                            //         console.error(err);
                            //     }
                            // });
                            if (awsError) {
                                console.log(awsError);
                                resolve(awsError);
                            }
                            else {
                                console.log(awsResponse);
                                resolve(awsResponse);
                            }
                        });
                    });
                }
                catch (error) {
                    resolve(error);
                }
            });
        });
    }
}
exports.AWSS3Service = AWSS3Service;
// export const awsS3Service: any = new AWSS3Service();
