import { Card, Skeleton } from '@heroui/react';
import React from 'react';

const loading = () => {

    const skeletons = Array.from({ length: 9 });
    return (
      <div>
        <div className="container mx-auto p-6 space-y-6">
          <Skeleton className="w-1/4 h-8 bg-primary/20 rounded-lg mb-6" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {skeletons.map((_, index) => (
              <Card
                key={index}
                className="w-full bg-primary/10 space-y-5 p-4"
                radius="lg"
              >
                <Skeleton className="rounded-lg">
                  <div className="h-48 rounded-lg bg-primary/20"></div>
                </Skeleton>

                <div className="space-y-3">
                  <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-4 rounded-lg bg-primary/20"></div>
                  </Skeleton>
                  <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 rounded-lg bg-primary/20"></div>
                  </Skeleton>
                  <div className="flex justify-between items-center pt-2">
                    <Skeleton className="w-2/5 rounded-lg">
                      <div className="h-4 rounded-lg bg-primary/20"></div>
                    </Skeleton>
                    <Skeleton className="w-1/4 rounded-lg">
                      <div className="h-8 rounded-lg bg-primary/20"></div>
                    </Skeleton>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
};

export default loading;